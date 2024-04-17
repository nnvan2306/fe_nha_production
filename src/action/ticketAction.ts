"use server"

import { IRes, ITicket } from "@/utils/interface"
import { revalidateTag } from "next/cache";

export const getAllTicket =async (calendarId:number):Promise<IRes<ITicket[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-ticket?calendarId=${calendarId}`,{
        // cache: "no-store",
        next : {tags :['getAgainTicket']}
    })
    const data = await res.json();

    return data;
}



export const handleGetOneTicket =async (id:number):Promise<IRes<ITicket>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-one-ticket?id=${id}`,{
        next : {tags :['getAgainInfoTicket']}
    })
    const data = await res.json();

    return data;
}





export const bookingTicketAction = async ({id , totalTicketBooking} : {id:number | undefined, totalTicketBooking:number }):Promise<IRes<[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/update-booking-ticket` ,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({id:id,totalTicketBooking:totalTicketBooking}),
        cache:"no-store"        
    })

    const data   = await res.json();

    // revalidateTag('getAgainTicket');
    // revalidateTag('getAgainInfoTicket');

    return data;
}