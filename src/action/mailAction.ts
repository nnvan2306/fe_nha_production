"use server"

import { IRes } from "@/utils/interface";

export const handleSendEmailAction =async({email}: {email:string}) : Promise<IRes<[]>>=>{
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/send-email`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({email:email}),
        cache:"no-store"
    });

    let data=await res.json();
    console.log()
    return data;
}