"use client";

import PageTest from "@/app/(marketing)/home/match/listMatch/page";
import { routes } from "@/helpers/menuRouterHeader";
import { IList } from "@/utils/interface";
import { Button } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function PageSelectMatch({
    listSeason,
    listTeam,
}: {
    listSeason: IList[];
    listTeam: IList[];
}) {
    const [seasonId, setSeasonId] = useState<number>(0);
    const [hostId, setHostId] = useState<number>(0);
    const [guestId, setGuestId] = useState<number>(0);

    const router: AppRouterInstance = useRouter();

    const handleViewListMatch = () => {
        let arrValidate = [seasonId, hostId, guestId];
        let count = 0;
        for (let i = 0; i < arrValidate.length; i++) {
            if (!arrValidate[i]) {
                count++;
            }
        }
        if (count === arrValidate.length) {
            return;
        }

        router.push(
            `${routes.match.url}/listMatch?seasonId=${seasonId}&hostId=${hostId}&guestId=${guestId}`
        );
    };

    return (
        <div className=" w-[100%] h-[80px] flex justify-around mt-[10px]">
            <select
                name=""
                id=""
                className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
                value={seasonId}
                onChange={(e) => setSeasonId(+e.target.value)}
            >
                <option value="">choose season</option>
                {listSeason &&
                    listSeason.length > 0 &&
                    listSeason.map((item: IList, index: number) => {
                        return (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
            </select>

            <select
                name=""
                id=""
                className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
                value={hostId}
                onChange={(e) => setHostId(+e.target.value)}
            >
                <option value="">choose host Team</option>
                {listTeam &&
                    listTeam.length > 0 &&
                    listTeam.map((item: IList, index: number) => {
                        return (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
            </select>

            <select
                name=""
                id=""
                className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm "
                value={guestId}
                onChange={(e) => setGuestId(+e.target.value)}
            >
                <option value="">choose guest Team</option>
                {listTeam &&
                    listTeam.length > 0 &&
                    listTeam.map((item: IList, index: number) => {
                        return (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
            </select>

            <div className="w-[20%] h-[60%]">
                <Button
                    className=" w-[100%] h-[100%] rounded-[10px] border-[1px] border-[#ccc] shadow-sm disabled"
                    onClick={() => handleViewListMatch()}
                >
                    Tìm kiếm
                </Button>
            </div>
        </div>
    );
}
