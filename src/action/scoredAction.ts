"use server"

import { IRes, IScored } from "@/utils/interface"

export const getScoredAction = async (matchId :number):Promise<IRes<IScored[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-scored?matchId=${matchId}`,{
        cache: "no-store",
    })
    const data =await res.json();
    return data;
}