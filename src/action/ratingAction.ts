"use server"

import { IRating, IRes } from "@/utils/interface"

export const  getRatingAction = async(seasonId : number ) : Promise<IRes<IRating[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-rating?seasonId=${seasonId}`,{
        cache: "no-store",
    })
    const data =await res.json();
    return data;
}