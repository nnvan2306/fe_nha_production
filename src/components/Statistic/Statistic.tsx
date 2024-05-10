"use client";

import { ISeason } from "@/utils/interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Statistic({
    listseason,
    seasonCurrent,
}: {
    listseason: ISeason[];
    seasonCurrent: number;
}) {
    const [seasonId, setSeasonId] = useState<number>(seasonCurrent);

    const router: AppRouterInstance = useRouter();

    const handleChangeSeason = (id: number) => {
        setSeasonId(id);
        router.push(`/home/statistic/${id}`);
    };

    useEffect(() => {
        if (seasonCurrent) {
            router.push(`/home/statistic/${seasonCurrent}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="md:w-[60%] w-[100%] ml-[50%] translate-x-[-50%]">
            <select
                className="mt-[20px] md:w-[25%] w-[40%] md:ml-[0px] ml-[20px] p-[10px] border-[1px] border-solid border-[#ccc] rounded-[10px] shadow-sm"
                value={seasonId}
                onChange={(e) => handleChangeSeason(+e.target.value)}
            >
                <option value={0}>Choose season</option>
                {listseason &&
                    listseason.length > 0 &&
                    listseason.map((item: ISeason, index: number) => {
                        return (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
}
