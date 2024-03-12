"use server"

import { IRaking } from "@/utils/interface"

export const  Login = async(seasonId : number | 1) : Promise<IRaking>=>{
    const res = await fetch(`${process.env.BASE_URL}/get-rating?seasonId=${seasonId}`,{
        cache: "no-store",
    })
    const data =await res.json();
    return data;
}