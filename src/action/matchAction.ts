"use server"

import { IDataSearchMatch, IMatch, IRes } from "@/utils/interface"

export const getMatchAction = async(dataBuider:IDataSearchMatch):Promise<IRes<IMatch[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/search-match?seasonId=${dataBuider.seasonId}&hostId=${dataBuider.hostId}&guestId=${dataBuider.guestId}`,{
        cache: "no-store",
    })
    let data = await res.json();
    return data;
}