import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData, setIsConnected } from "../store/batteryData";

export const useWebsocket = () => {
  const [socket, setSocket] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);
  // const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  //웹소켓 연결
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.219.113:8030/ws");

    ws.onopen = () => {
      // setIsConnected(true);
      dispatch(setIsConnected(true));
      console.log("server connected");
    };
    ws.onmessage = (event) => {
      // setMessage(event.data);
      // console.log("message received: ", event.data);
      dispatch(setData(event.data));
    };
    ws.onclose = () => {
      // setIsConnected(false);
      dispatch(setIsConnected(false));
      console.log("server disconnected");
    };
    ws.onerror = (error) => {
      console.log("server error: ", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [dispatch]);

  return { socket };
};
