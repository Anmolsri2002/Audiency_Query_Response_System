// src/hooks/useSocket.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
    const s = io(API_BASE, { transports: ["websocket", "polling"] });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return socket;
}
