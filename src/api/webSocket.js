import { useState, useEffect } from "react";

export const useWebsocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState(null);

  //웹소켓 연결
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.219.111:8030/ws");

    ws.onopen = () => {
      setIsConnected(true);
      console.log("server connected");
    };
    ws.onmessage = (event) => {
      setMessage(event.data);
      // console.log("message received: ", event.data);
    };
    ws.onclose = () => {
      setIsConnected(false);
      console.log("server disconnected");
    };
    ws.onerror = (error) => {
      console.log("server error: ", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return { socket, isConnected, message };
};
