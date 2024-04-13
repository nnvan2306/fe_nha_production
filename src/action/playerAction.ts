"use server"

import { IPlayer, IRes } from "@/utils/interface";

export const getPlayerAction =async():Promise<IRes<IPlayer[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-player-active`,{
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export const getOnePlayerAction = async(id:number):Promise<IRes<IPlayer>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-one-player?playerId=${id}`,{
        cache: "no-store",
    })
    const data = await res.json();
    return data;
}


export const searchPlayerAction = async(textSearch:string):Promise<IRes<IPlayer>>=>{
    const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/search-player`,{
        cache: "no-store",
    });

    const data = (await res).json();
    return data;
    
}