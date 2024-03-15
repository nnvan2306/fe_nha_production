import { IPlayer } from "@/utils/interface";

export const getPlayerAction =async():Promise<IPlayer>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-player?page=1&pageSize=${process.env.NEXT_PUBLIC_PAGESIZE_PLAYER}`,{
        cache: "no-store",
    })
    const data = await res.json();
    return data;
}