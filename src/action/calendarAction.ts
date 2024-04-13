"use server"

import { ICalendar, IRes } from "@/utils/interface";

export const getCalendarAction = async({dataBuider : {hostId , guestId}}:{dataBuider : {hostId:number , guestId:number}}):Promise<IRes<ICalendar[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-calender?hostId=${hostId}&guestId=${guestId}` , {
        cache:"no-store",
    });
    const data = await res.json();
    return data;
}

export const getNearestCalendarAction = async():Promise<IRes<ICalendar[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-nearest-calendar` , {        
        cache:"no-store",
    });
    const data = await res.json();
    return data; 
}