"use server"

import { IRes } from "@/utils/interface";


export const CreateBillAction = async({price , uuid }: {price : number , uuid : string}):Promise<IRes<[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create-bill` , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({price : price , uuid : uuid}),
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