import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useWebsocketData = () => {
  const data = useSelector((state) => state.data);
  const isConnected = useSelector((state) => state.connection);

  useEffect(() => {
    if (isConnected) {
      console.log("Received data: ", data);
    }
  }, [isConnected, data]);

  return { data, isConnected };
};
