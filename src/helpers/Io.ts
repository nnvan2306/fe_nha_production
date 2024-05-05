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

export const ioHandlerComment =async (dataBuider: any, socket:any) => {
    if (!socket) return;

    await socket.emit("replycm", dataBuider);
    
    // await socket.on("reply_suc", (data: any   ) => {
    //     return data;
    // });   
}

export const ioHandleLikeComment = async (dataBuider : any, socket:any)=>{
    if (!socket) return;

    await socket.emit("likeComment" , dataBuider);
}

export const ioHandleDislikeComment = async (dataBuider  : any , socket : any)=>{
    if (!socket) return;

    await socket.emit("dislikeComment" , dataBuider);
}

