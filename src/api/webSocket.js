import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { clearData, resetData, setData, setIsConnected } from "../store/batteryData";

export const useWebsocket = () => {
  const dispatch = useDispatch();
  const ws = useRef(null);
  const lastReceivedTimesRef = useRef({});

  //웹소켓 연결
  useEffect(() => {
    if (!ws.current) {
      // ws.current = new WebSocket("ws://192.168.219.122:8030/ws");
      ws.current = new WebSocket("ws://3.35.111.150:8030/ws");
    }

    ws.current.onopen = () => {
      dispatch(setIsConnected(true));
      console.log("server connected");
      console.log("open readyState: ", ws.current.readyState);
    };
    ws.current.onmessage = (event) => {
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
    ws.current.onclose = () => {
      dispatch(setIsConnected(false));
      dispatch(clearData());
      console.log("server disconnected");
      console.log("close readyState: ", ws.current.readyState);
    };
    ws.current.onerror = (error) => {
      console.log("server error: ", error);
    };

    if (ws.current !== null) {
      return;
    }

    return () => {
      ws.current.close();
    };
  }, [dispatch]);

  useEffect(() => {
    const checkDataInterval = setInterval(() => {
      const currentTime = Date.now();
      Object.entries(lastReceivedTimesRef.current).forEach(([packId, lastTime]) => {
        if (currentTime - lastTime > 10000) {
          const packDataKey = `packData${packId}`;
          console.log(`No data received for ${packId} in the last 10 seconds. Dispatching resetData.`);
          dispatch(resetData(packDataKey));
          delete lastReceivedTimesRef.current[packId];
        }
      });
    }, 3000);

    return () => {
      clearInterval(checkDataInterval);
    };
  }, [dispatch]);

  return { ws: ws.current };
};
