import { useState, useEffect, forwardRef } from "react";
import Style from "./BatteryCard.style";
import PropTypes from "prop-types";

const BatteryCard = forwardRef(({ data, handleModalOpen }, ref) => {
  // 단일 배터리 팩 카드 컴포넌트
  const [isLoading, setIsLoading] = useState(true);
  const batteryData = data;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleClick = () => {
    if (!batteryData) {
      alert("연결되지 않은 배터리 팩입니다.");
      return;
    }
    handleModalOpen();
  };

  return (
    <Style.Container onClick={handleClick} ref={ref}>
      <Style.CardHeader>
        <h3>배터리 {batteryData ? batteryData.packId : "--"}</h3>
        <h4>Cradle {batteryData ? batteryData.cradleId : "--"}</h4>
      </Style.CardHeader>
      <Style.CardBody>
        {isLoading ? (
          <Style.CardLoading>연결중입니다...</Style.CardLoading>
        ) : (
          <>
            <Style.CardContent>
              <h4>상태 :</h4>
              <p>{batteryData ? (batteryData.batteryStatus === 1 ? "충전" : "방전") : "--"}</p>
            </Style.CardContent>
            <Style.CardContent>
              <h4>전압 :</h4>
              <p>{batteryData ? batteryData.packVoltage : 0} V</p>
            </Style.CardContent>
            <Style.CardContent>
              <h4>전류 :</h4>
              <p>{batteryData ? batteryData.current : 0} A</p>
            </Style.CardContent>
            <Style.CardContent>
              <h4>최대 셀 전압 :</h4>
              <p>{batteryData ? batteryData.maxCellVoltage : 0} V</p>
            </Style.CardContent>
            <Style.CardContent>
              <h4>최소 셀 전압 :</h4>
              <p>{batteryData ? batteryData.minCellVoltage : 0} V</p>
            </Style.CardContent>
            <Style.CardContent>
              <h4>온도 :</h4>
              <p>{batteryData ? batteryData.temperature - 40 : 0} ℃</p>
            </Style.CardContent>
            <Style.CardContent>
              <h4>SoC :</h4>
              <p>{batteryData ? batteryData.soc : 0} %</p>
            </Style.CardContent>
          </>
        )}
      </Style.CardBody>
    </Style.Container>
  );
});

BatteryCard.displayName = "BatteryCard";

BatteryCard.propTypes = {
  handleModalOpen: PropTypes.func,
  data: PropTypes.object,
};

export default BatteryCard;
