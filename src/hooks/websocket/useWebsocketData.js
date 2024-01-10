import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useWebsocketData = () => {
  const packData = useSelector((state) => state.data || {});
  const isConnected = useSelector((state) => state.connection);

  useEffect(() => {
    if (isConnected) {
      // console.log("Received data: ", packData);
    }
  }, [isConnected, packData]);

  return { packData, isConnected };
};
