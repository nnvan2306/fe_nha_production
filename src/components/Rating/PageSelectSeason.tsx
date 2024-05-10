"use client";

import { IList } from "@/utils/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PageSelectSeason({
    listSeason,
    seasonId,
}: {
    listSeason: IList[];
    seasonId: number;
}) {
    const [seasonIdCurrent, setSeasonIdCurrent] = useState<number>(seasonId);

    const router: AppRouterInstance = useRouter();

    const handleChangeSeason = (id: number) => {
        setSeasonIdCurrent(id);
        router.push(`/home/rating/${id}`);
    };

    useEffect(() => {
        if (seasonId) {
            router.push(`/home/rating/${seasonId}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-[100%] md:w-[70%] ml-[50%] translate-x-[-50%] mt-[20px] px-[10px]">
            <select
                className="md:w-[20%] w-[50%] py-[10px] px-[15px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-md"
                value={seasonIdCurrent}
                onChange={(e) => handleChangeSeason(+e.target.value)}
            >
                <option value={0}>Choose season</option>
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
        </div>
    );
}
