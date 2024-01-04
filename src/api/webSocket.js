import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData, setIsConnected } from "../store/batteryData";

export const useWebsocket = () => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  //웹소켓 연결
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.219.111:8030/ws");
    // const ws = new WebSocket("ws://3.35.111.150:8030/ws");

    ws.onopen = () => {
      dispatch(setIsConnected(true));
      console.log("server connected");
    };
    ws.onmessage = (event) => {
      let message;
      try {
        message = JSON.parse(event.data);
        dispatch(setData(message));
      } catch (error) {
        message = event.data;
        console.log("message received: ", event.data);
      }
    };
    ws.onclose = () => {
      dispatch(setIsConnected(false));
      console.log("server disconnected");
    };
    ws.onerror = (error) => {
      console.log("server error: ", error);
    };

    if (socket !== null) {
      return;
    }

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [dispatch, socket]);

  return { socket };
};
