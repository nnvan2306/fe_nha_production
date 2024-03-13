"use server"

import { IMatch, IRes } from "@/utils/interface"

export const getMatchAction = async():Promise<IRes<IMatch[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-match`,{
        cache: "no-store",
    })
    let data = await res.json();
    return data;
}