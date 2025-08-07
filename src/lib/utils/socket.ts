// lib/socket.js
import { io } from "socket.io-client";

export const createSocket = ({ token }: { token: string }) => {
  return io(`${process.env.NEXT_PUBLIC_WS_URL}/dashboard`, {
    auth: { token },
    transports: ["websocket"],
  });
};
