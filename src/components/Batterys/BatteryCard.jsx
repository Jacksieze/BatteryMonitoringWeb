import { forwardRef } from "react";
import Style from "./BatteryCard.style";
import PropTypes from "prop-types";

const batteryData = [
  { name: "상태 :", value: "충전" },
  { name: "전압 :", value: "36.7V" },
  { name: "전류 :", value: "1.5A" },
  { name: "최대 셀 전압 :", value: "3.8906 V" },
  { name: "최소 셀 전압 :", value: "3.7174 V" },
  { name: "온도 :", value: "25℃" },
  { name: "SOC :", value: "100%" },
];

const BatteryCard = forwardRef(({ handleModalOpen }, ref) => {
  // 단일 배터리 팩 카드 컴포넌트
  return (
    <Style.Container onClick={handleModalOpen} ref={ref}>
      <Style.CardHeader>
        <h3>배터리</h3>
      </Style.CardHeader>
      <Style.CardBody>
        {batteryData.map((item, index) => (
          <Style.CardContent key={index}>
            <h4>{item.name}</h4>
            <p>{item.value}</p>
          </Style.CardContent>
        ))}
      </Style.CardBody>
    </Style.Container>
  );
});

BatteryCard.displayName = "BatteryCard";

BatteryCard.propTypes = {
  handleModalOpen: PropTypes.func,
};

export default BatteryCard;
