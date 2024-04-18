"use server"

import {  IComment, IRes } from "@/utils/interface";

export const handleGetCommentAction = async():Promise<IRes<IComment[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-comment?page=1&pageSize=10` , {
        cache:"no-store",
    });
    const data = await res.json();
    return data;
}


export const  handleLikeAction = async({commentId   , isIncrease } : {commentId : number  , isIncrease:number }) : Promise<IRes<[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/like-comment`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        
        body: JSON.stringify({commentId:commentId   ,isIncrease:isIncrease }),
        cache:"no-store",
    });
    const data =await res.json();
    return data;
}


export const  handleDislikeAction = async({commentId   , isIncrease } : {commentId : number  , isIncrease:number }) : Promise<IRes<[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dislike-comment`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        
        body: JSON.stringify({commentId:commentId ,isIncrease:isIncrease }),
        cache:"no-store",
    });
    const data =await res.json();
    return data;
}