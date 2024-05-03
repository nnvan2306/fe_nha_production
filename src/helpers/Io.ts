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

export const ioHandlerComment = (dataBuider: any, socket:any) => {
    if (!socket) return;
    socket.emit("replycm", dataBuider);
    
    socket.on("reply_suc", (data: any   ) => {
        console.log(data);
    });
}