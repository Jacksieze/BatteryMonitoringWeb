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
    if (socket && socket.readyState === WebSocket.OPEN) {
      const next = chargeSwitch === 0 ? 1 : 0;
      const message = {
        cradleId: packData.cradleId,
        packId: packData.packId,
        chgStatus: next,
        dsgStatus: packData.DSGMOS_status,
      };
      try {
        socket.send(JSON.stringify(message));
        setChargeSwitch(next);
      } catch (error) {
        console.error("Sending Falied", error);
      }
    }
  };

  const handleDischargeSwitch = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const next = dischargeSwitch === 0 ? 1 : 0;
      const message = {
        cradleId: packData.cradleId,
        packId: packData.packId,
        chgStatus: packData.CHGMOS_status,
        dsgStatus: next,
      };
      try {
        socket.send(JSON.stringify(message));
        setDischargeSwitch(next);
      } catch (error) {
        console.error("Sending Falied", error);
      }
    }
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
  packData: PropTypes.object,
  socket: PropTypes.object,
};

export default ButtonSwitch;
