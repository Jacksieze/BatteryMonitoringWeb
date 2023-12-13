import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../store/batteryData";

export const useWebsocketData = () => {
  const packData = useSelector((state) => state.data || {});
  const isConnected = useSelector((state) => state.connection);
  const dispatch = useDispatch();
  const wasConnectedRef = useRef(isConnected);

  useEffect(() => {
    if (isConnected) {
      console.log("Received data: ", packData);
    }
    if (wasConnectedRef.current && !isConnected) {
      dispatch(setData({}));
    }
    wasConnectedRef.current = isConnected;
  }, [isConnected, packData, dispatch]);

  return { packData, isConnected };
};
