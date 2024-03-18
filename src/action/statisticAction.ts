"use server"

import { IRes, IStatistic } from "@/utils/interface"

export const handleGetStatisticAction =async(id:number):Promise<IRes<IStatistic[]>>=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-statistic-season?seasonId=${id}`,{
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export const handleGetStatisticPlayer =async (id:number):Promise<IRes<IStatistic[]>>=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-statistic-player?id=${id}`,{
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}