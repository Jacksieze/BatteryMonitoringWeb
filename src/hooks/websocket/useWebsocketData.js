import { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../store/batteryData";

export const useWebsocketData = () => {
  const packData = useSelector((state) => state.data || {});
  const isConnected = useSelector((state) => state.connection);
  const dispatch = useDispatch();
  const wasConnectedRef = useRef(isConnected);

  const packDataArray = useMemo(() => {
    if (!packData) return [];
    return Object.entries(packData).map(([key, value]) => {
      return { id: key, data: value };
    });
  }, [packData]);

  useEffect(() => {
    if (isConnected) {
      console.log("Received data: ", packData);
    }
    if (wasConnectedRef.current && !isConnected) {
      dispatch(setData({}));
    }
    wasConnectedRef.current = isConnected;
  }, [isConnected, packData, dispatch]);

  return { packData, packDataArray, isConnected };
};
