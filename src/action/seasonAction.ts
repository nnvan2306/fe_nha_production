"use server"

import { IRes, ISeason } from "@/utils/interface"

export const getAllSeasonAction =async() : Promise<IRes<ISeason[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-season`,{
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}