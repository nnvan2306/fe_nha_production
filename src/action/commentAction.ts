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


export const  handleLikeCommentAction = async({ commentId , userId   } : {commentId : number ,userId : number  }) : Promise<IRes<[]>>=>{
    // revalidateTag('getComment'); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/like-comment`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        
        body: JSON.stringify({commentId : commentId , userId : userId }),
        cache:"no-store",
    });
    const data =await res.json();
    return data;
}


export const  handleDislikeCommentAction = async({commentId , userId   } : {commentId : number , userId:number  }) : Promise<IRes<[]>>=>{
    // revalidateTag('getComment'); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dislike-comment`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        
        body: JSON.stringify({commentId:commentId , userId:userId   }),
        cache:"no-store",
    });
    const data =await res.json();
    return data;
}


export const handleLikeFeedbackAction = async({feedbackId , userId} : {feedbackId : number  , userId : number}) : Promise<IRes<[]>>=>{
    // revalidateTag('getComment'); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/like-feedback`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        
        body: JSON.stringify({feedbackId : feedbackId , userId : userId }),
        cache:"no-store",
    });
    const data =await res.json();
    return data;
}

export const handleDislikeFeedbackAction = async({feedbackId , userId} : {feedbackId : number  , userId : number}) : Promise<IRes<[]>>=>{
    // revalidateTag('getComment'); 
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dislike-feedback`,{
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        
        body: JSON.stringify({feedbackId : feedbackId , userId : userId }),
        cache:"no-store",
    });
    const data =await res.json();
    return data;
}

export const handleDeleteCommentAction = async ({commentId} : {commentId : number}) :Promise<IRes<[]>>=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/delete-comment?commentId=${commentId}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        
        // body: JSON.stringify({feedbackId : feedbackId , userId : userId }),
        cache:"no-store",
    });
    const data =await res.json();
    return data;   
}