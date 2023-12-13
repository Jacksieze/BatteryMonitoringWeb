import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useWebsocket } from "../../../../api/webSocket";

const ButtonSwitch = ({ packData }) => {
  const { socket } = useWebsocket();
  const [chargeSwitch, setChargeSwitch] = useState(0);
  const [dischargeSwitch, setDischargeSwitch] = useState(0);

  useEffect(() => {
    setChargeSwitch(packData.CHGMOS_status);
    setDischargeSwitch(packData.DSGMOS_status);
  }, [packData]);

  const handleChargeSwitch = () => {
    setChargeSwitch((prev) => {
      const next = prev === 0 ? 1 : 0;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            packId: packData.packId,
            cradleId: packData.cradleId,
            chgStatus: next,
            dsgStatus: packData.DSGMOS_status,
          })
        );
      }
      return next;
    });
  };

  const handleDischargeSwitch = () => {
    setDischargeSwitch((prev) => {
      const next = prev === 0 ? 1 : 0;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            packId: packData.packId,
            cradleId: packData.cradleId,
            chgStatus: packData.CHGMOS_status,
            dsgStatus: next,
          })
        );
      }
      return next;
    });
  };

  console.log(chargeSwitch, dischargeSwitch);

  return (
    <Container>
      <ToggleWrapper>
        <Label>충전</Label>
        <Toggle type="checkbox" label="충전" checked={chargeSwitch} onChange={handleChargeSwitch} />
      </ToggleWrapper>
      <ToggleWrapper>
        <Label>방전</Label>
        <Toggle type="checkbox" label="방전" checked={dischargeSwitch} onChange={handleDischargeSwitch} />
      </ToggleWrapper>
    </Container>
  );
};

ButtonSwitch.propTypes = {
  packData: PropTypes.object,
};

export default ButtonSwitch;

const Container = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 20px 40px;
  @media (${({ theme }) => theme.media.mobile}) {
    height: 50px;
    justify-content: space-around;
  }
`;
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 4px;
`;
const Toggle = styled.input`
  &[type="checkbox"] {
    position: relative;
    width: 80px;
    height: 40px;
    margin: 0;
    appearance: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.gray};
    border-radius: 50px;
    cursor: pointer;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
  }
  &[type="checkbox"]:checked {
    background-color: ${({ theme, label }) => (label === "충전" ? theme.colors.positive : theme.colors.negative)};
  }
  &[type="checkbox"]:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: left 0.3s ease;
  }
  &[type="checkbox"]:checked:after {
    left: 42px;
  }
`;
