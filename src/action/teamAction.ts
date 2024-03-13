"use server"

import { IRes, ITeam } from "@/utils/interface"

export const getAllTeamAction = async():Promise<IRes<ITeam[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-team`,{
        cache: "no-store",
    })

    let data = await res.json();
    return data;
}