"use server"

import { IRating, IRes, ITeam } from "@/utils/interface"

export const  getRatingAction = async(seasonId : number ) : Promise<IRes<IRating<ITeam | undefined>>>=>{
    const res = await fetch(`${process.env.BASE_URL}/get-rating?seasonId=${seasonId}`,{
        cache: "no-store",
    })
    const data =await res.json();
    return data;
}