"use client";

import { getMatchAction } from "@/action/matchAction";
import { routes } from "@/helpers/menuRouterHeader";
import { IList, IMatch } from "@/utils/interface";
import { Button, Empty } from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import poster from "../../../public/poster.png";

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
    const [loadings, setLoadings] = useState<boolean>(false);
    const [listMatch, setListMatch] = useState<IMatch[]>([]);

    const router: AppRouterInstance = useRouter();

    const handleValidate = (): boolean => {
        let arrValidate = [seasonId, hostId, guestId];
        let count = 0;
        for (let i = 0; i < arrValidate.length; i++) {
            if (!arrValidate[i]) {
                count++;
            }
        }
        if (count === arrValidate.length) {
            return false;
        }
        return true;
    };

    const handleGetmatch = async () => {
        setLoadings(true);
        const check = handleValidate();
        if (!check) {
            setLoadings(false);
            return;
        }
        let dataBuider = {
            seasonId: +seasonId,
            hostId: +hostId,
            guestId: +guestId,
        };

        const res = await getMatchAction(dataBuider);
        if (res.errorCode === 0) {
            let listSortDetalDate = res.data.sort((a: IMatch, b: IMatch) => {
                let dateA = new Date(a.date).getTime();
                let dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });
            setListMatch(listSortDetalDate);
        }

        setLoadings(false);
    };

    const handlePushDetailMatch = async (matchId: number) => {
        router.push(`${routes.match.url}/${matchId}`);
    };

    return (
        <div className="w-[80%] h-[100%] ml-[50%] translate-x-[-50%]">
            <div className=" w-[100%] h-[80px] flex justify-around mt-[10px]">
                <select
                    name=""
                    id=""
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm px-[10px]"
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
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm px-[10px]"
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
                    className="w-[25%] h-[60%]  rounded-[10px] border-[1px] border-[#ccc] shadow-sm px-[10px]"
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
                        onClick={() => handleGetmatch()}
                        loading={loadings}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>

            {listMatch.length === 0 ? <Empty className="mt-[50px]" /> : <></>}

            <div className="w-[100%] grid grid-cols-2 gap-3">
                {listMatch &&
                    listMatch.length > 0 &&
                    listMatch.map((item: IMatch, index: number) => {
                        return (
                            <div
                                className="w-[100%] h-[150px] border-[1px] border-solid border-[#ccc] flex cursor-pointer rounded-[5px]"
                                key={index}
                                onClick={() => handlePushDetailMatch(item.id)}
                            >
                                <div className="w-[70%] h-[100%]  flex justify-between">
                                    <div className="w-[80%] mt-[40px] py-[5px]">
                                        <div className="w-[100%] flex items-center">
                                            <Image
                                                className="w-[30%] h-[30px] object-contain"
                                                width={100}
                                                height={100}
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Teams[0].logo_url}`}
                                                alt="logo"
                                            ></Image>
                                            <p>{item.Teams[0].name}</p>
                                        </div>
                                        <div className="w-[100%] flex items-center py-[5px]">
                                            <Image
                                                className="w-[30%] h-[30px] object-contain"
                                                width={100}
                                                height={100}
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.Teams[1].logo_url}`}
                                                alt="logo"
                                            ></Image>
                                            <p>{item.Teams[1].name}</p>
                                        </div>
                                    </div>

                                    <div className="w-[15%] mt-[40px]">
                                        <div className="w-[100%] h-[30px] flex items-center">
                                            <p>
                                                {item.hostGoal}{" "}
                                                {item.hostGoal >
                                                item.guestGoal ? (
                                                    <span className="ml-[10px]">
                                                        <i className="bi bi-caret-left-fill"></i>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </p>
                                        </div>

                                        <div className="w-[100%] h-[50px] flex items-center">
                                            <p>
                                                {item.guestGoal}
                                                {item.hostGoal <
                                                item.guestGoal ? (
                                                    <span>
                                                        <i className="bi bi-caret-left-fill"></i>
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[30%] h-[100%] border-[1px] border-solid border-[#ccc]">
                                    <p className="mt-[10px] mb-[2px] text-center">
                                        KT
                                    </p>
                                    <p className="text-center mb-[2px]">
                                        {item.date}
                                    </p>
                                    <div className=" w-[100px] h-[80px] ml-[50%] translate-x-[-50%] relative">
                                        <Image
                                            className="w-[100%] h-[100%] object-contain absolute z-1"
                                            src={poster}
                                            alt="poster"
                                        />
                                        <div className="w-[100%] h-[100%] absolute z-2 flex justify-center items-center">
                                            <i className="bi bi-play-circle-fill text-[25px] text-[red]"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
