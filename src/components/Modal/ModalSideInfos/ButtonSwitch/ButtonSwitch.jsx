import { useState, useEffect } from "react";
import Style from "./ButtonSwitch.style";
import PropTypes from "prop-types";

const ButtonSwitch = ({ packData, socket }) => {
  const [chargeSwitch, setChargeSwitch] = useState(0);
  const [dischargeSwitch, setDischargeSwitch] = useState(0);

  useEffect(() => {
    if (packData) {
      setChargeSwitch(packData.CHGMOS_status);
      setDischargeSwitch(packData.DSGMOS_status);
    }
  }, [packData]);

  const handleChargeSwitch = () => {
    if (!packData) return;
    setChargeSwitch((prev) => {
      const next = prev === 0 ? 1 : 0;
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("socket is connected");
        const message = {
          packId: packData.packId,
          cradleId: packData.cradleId,
          chgStatus: next,
          dsgStatus: packData.DSGMOS_status,
        };
        console.log("Sending chg message:", message);
        socket.send("chg잘 보내지는가?", JSON.stringify(message));
      } else {
        console.log("socket is not connected");
      }
      return next;
    });
  };

  const handleDischargeSwitch = () => {
    if (!packData) return;
    setDischargeSwitch((prev) => {
      const next = prev === 0 ? 1 : 0;
      if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("socket is connected");
        const message = {
          packId: packData.packId,
          cradleId: packData.cradleId,
          chgStatus: packData.CHGMOS_status,
          dsgStatus: next,
        };
        console.log("Sending dsg message:", message);
        socket.send("잘 보내지는가?", JSON.stringify(message));
      } else {
        console.log("socket is not connected");
      }
      return next;
    });
  };

  return (
    <Style.Container>
      <Style.ToggleWrapper>
        <Style.Label>충전</Style.Label>
        <Style.Toggle type="checkbox" label="충전" checked={chargeSwitch} onChange={handleChargeSwitch} />
      </Style.ToggleWrapper>
      <Style.ToggleWrapper>
        <Style.Label>방전</Style.Label>
        <Style.Toggle type="checkbox" label="방전" checked={dischargeSwitch} onChange={handleDischargeSwitch} />
      </Style.ToggleWrapper>
    </Style.Container>
  );
};

ButtonSwitch.propTypes = {
  packData: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
};

export default ButtonSwitch;
