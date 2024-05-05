import { Socket } from "socket.io";

export const connected = (
    io: any,
    link: string,
    setSocket: React.Dispatch<React.SetStateAction<any>>
) => {
    const ws: any = io(link);
    ws.on("connect", () => {
        ws.emit("connected", true);
        setSocket(ws);
    });
};

// create comment

export const ioHandlerCreateComment =async (dataBuider: any, socket:any) => {
    if (!socket) return;

    await socket.emit("createComment", dataBuider);
}


// delete comment

export const ioHandleDeleteComment = async(dataBuider: any, socket:any)=>{
    if (!socket) return;

    await socket.emit("deleteComment", dataBuider);
}


// like comment

export const ioHandleLikeComment = async (dataBuider : any, socket:any)=>{
    if (!socket) return;

    await socket.emit("likeComment" , dataBuider);
}


//dislike comment

export const ioHandleDislikeComment = async (dataBuider  : any , socket : any)=>{
    if (!socket) return;

    await socket.emit("dislikeComment" , dataBuider);
}

//create feedback

export const ioHandleCreateFeedback = async (dataBuider  : any , socket : any)=>{
    if (!socket) return;

    await socket.emit("createFeedback" , dataBuider);
}


//create delete feedback

export const ioHandleDeleteFeedback = async (dataBuider  : any , socket : any)=>{
    if (!socket) return;

    await socket.emit("deleteFeedback" , dataBuider);
}


// like feedback

export const ioHandleLikeFeedback = async (dataBuider  : any , socket : any)=>{
    if (!socket) return;

    await socket.emit("likeFeedback" , dataBuider);
}

// dislike feedback

export const ioHandleDislikeFeedback = async (dataBuider  : any , socket : any)=>{
    if (!socket) return;

    await socket.emit("dislikeFeedback" , dataBuider);
}



