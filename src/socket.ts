import { io } from "socket.io-client";

// const socket = io('http://localhost:8080' );
const socket = io("https://fe-nha-production.vercel.app/");

export default socket;
