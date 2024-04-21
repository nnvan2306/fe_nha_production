"use server"

import {  IComment, IListLimit, IRes } from "@/utils/interface";
import { revalidateTag } from "next/cache";

export const handleGetCommentAction = async({page , pageSize , matchId} : {page:number , pageSize : number , matchId: number}):Promise<IRes<IListLimit<IComment> >>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-comment?page=${page}&pageSize=${pageSize}&matchId=${matchId}` , {
        next : {tags :['getComment']}
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


export const handleCreateComment = async({content ,matchId, userId } : {content : string , matchId :number , userId:number}):Promise<IRes<[]>>=>{
    revalidateTag('getComment'); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/create-comment`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        
        body: JSON.stringify({content : content , matchId : matchId , userId : userId}),
        cache:"no-store",
    });
    const data =await res.json();
    return data;
}