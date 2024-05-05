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




