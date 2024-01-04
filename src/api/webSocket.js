import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearData, resetData, setData, setIsConnected } from "../store/batteryData";

export const useWebsocket = () => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const lastReceivedTimesRef = useRef({});

  //웹소켓 연결
  useEffect(() => {
    // const ws = new WebSocket("ws://192.168.219.111:8030/ws");
    const ws = new WebSocket("ws://3.35.111.150:8030/ws");

    ws.onopen = () => {
      dispatch(setIsConnected(true));
      console.log("server connected");
    };
    ws.onmessage = (event) => {
      let message;
      try {
        message = JSON.parse(event.data);
        Object.entries(message).forEach(([key, data]) => {
          if (key.startsWith("packData") && typeof data === "object" && "packId" in data) {
            const packId = data.packId;
            dispatch(setData({ [key]: data }));
            lastReceivedTimesRef.current[packId] = Date.now();
          }
        });
      } catch (error) {
        message = event.data;
        console.log("message received: ", event.data);
      }
    };
    ws.onclose = () => {
      dispatch(setIsConnected(false));
      dispatch(clearData());
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

  useEffect(() => {
    const checkDataInterval = setInterval(() => {
      const currentTime = Date.now();
      Object.entries(lastReceivedTimesRef.current).forEach(([packId, lastTime]) => {
        if (currentTime - lastTime > 5000) {
          const packDataKey = `packData${packId}`;
          console.log(`No data received for ${packId} in the last 5 seconds. Dispatching resetData.`);
          dispatch(resetData(packDataKey));
          delete lastReceivedTimesRef.current[packId];
        }
      });
    }, 3000);

    return () => {
      clearInterval(checkDataInterval);
    };
  }, [dispatch]);

  return { socket };
};
