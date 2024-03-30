"use server"

import { ICalendar, IRes } from "@/utils/interface";

export const getCalendarAction = async({dataBuider : {hostId , guestId}}:{dataBuider : {hostId:number , guestId:number}}):Promise<IRes<ICalendar[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-calender?hostId=${hostId}&guestId=${guestId}`);
    const data = await res.json();
    return data;
}