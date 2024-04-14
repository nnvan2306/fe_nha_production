"use server"

import { IRes } from "@/utils/interface";


export const CreateBillAction = async({  uuid , ticketId , totalTicket,email,phoneNumber,firstName , lastName , address , city , country }: { uuid : string , ticketId : number | undefined , totalTicket : number, email:string , phoneNumber:number , firstName:string , lastName:string , address:string , city:string , country:string}):Promise<IRes<[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create-bill` , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({uuid : uuid , ticketId : ticketId , totalTicket:totalTicket , email: email , phoneNumber: phoneNumber , firstName: firstName , lastName: lastName , address: address , city: city , country: country}),
        cache:"no-store",

    });
    const data = await res.json();
    return data;

}






export const deleteBillAction = async(uuid : string):Promise<IRes<[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/delete-bill?uuid=${uuid}` , {
        method: 'DELETE',
        cache:"no-store",
    });
    const data = await res.json();
    return data;
}