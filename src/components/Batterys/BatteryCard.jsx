import { useState, useEffect, forwardRef } from "react";
import Style from "./BatteryCard.style";
import PropTypes from "prop-types";
import CardContent from "./CardContent";

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
            <CardContent
              title="상태"
              data={batteryData ? (batteryData.batteryStatus === 1 ? "충전" : "방전") : "--"}
              unit={""}
            />
            <CardContent title="전압" data={batteryData ? batteryData.packVoltage : 0} unit="V" />
            <CardContent title="전류" data={batteryData ? batteryData.current : 0} unit="A" />
            <CardContent title="최대 셀 전압" data={batteryData ? batteryData.maxCellVoltage : 0} unit="V" />
            <CardContent title="최소 셀 전압" data={batteryData ? batteryData.minCellVoltage : 0} unit="V" />
            <CardContent title="온도" data={batteryData ? batteryData.temperature - 40 : 0} unit="℃" />
            <CardContent title="SoC" data={batteryData ? batteryData.soc : 0} unit="%" />
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
