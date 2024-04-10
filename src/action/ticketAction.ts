"use server"

import { IRes, ITicket } from "@/utils/interface"

export const getAllTicket =async (calendarId:number):Promise<IRes<ITicket[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-ticket?calendarId=${calendarId}`,{
        cache: "no-store",
    })
    const data = await res.json();

    return data;
}



export const handleGetOneTicket =async (id:number):Promise<IRes<ITicket>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-one-ticket?id=${id}`,{
        cache: "no-store",
    })
    const data = await res.json();

    return data;
}





// export const bookingTicketAction = async (id:number):Promise<IRes<[]>>=>{
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/update-booking-ticket` ,{id:id},{
//         cache: "no-store",
//     })
//     const data = await res.json();

//     return data;
// }