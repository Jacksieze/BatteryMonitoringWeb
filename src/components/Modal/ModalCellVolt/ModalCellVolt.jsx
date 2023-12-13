import { useState, useEffect } from "react";
import Style from "./ModalCellVolt.style";
import PropTypes from "prop-types";
import CellWrapper from "./CellWrapper/CellWrapper";
import TotalCellVolt from "./TotalCellVolt/TotalCellVolt";

const ModalCellVolt = ({ packData }) => {
  // 배터리 팩의 셀 전압 모달 컴포넌트
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 모달 컴포넌트가 렌더링 될 때 1초 후에 로딩이 완료되도록 설정
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const cellVolt = packData ? packData.cellVoltage : {};
  const totalCellVolt = packData ? packData.packVoltage : null;

  // ----------------------------- 렌덤한 셀 전압 생성 -----------------------------
  // const [randomCellVolt, setRandomCellVolt] = useState([]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setRandomCellVolt(
  //       Array(14)
  //         .fill()
  //         .map((_) => Number((Math.random() * 1 + 3).toFixed(4)))
  //     );
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // const totalCellVolt = Number(randomCellVolt.reduce((acc, cur) => acc + cur, 0).toFixed(1));
  // ---------------------------------------------------------------------------

  return (
    <Style.Container>
      <Style.CellContainer>
        {isLoading ? (
          <p style={{ fontSize: 20 }}>불러오는 중 입니다...</p>
        ) : (
          Object.entries(cellVolt).map(([cell, voltage], index) => (
            <CellWrapper key={index} cellNumber={cell.replace("cell", "")} cellVolt={voltage} />
          ))
        )}
      </Style.CellContainer>
      <Style.VoltBox>
        {isLoading ? (
          <p style={{ fontSize: 20, textAlign: "center" }}>잠시만 기다려주세요...</p>
        ) : (
          <TotalCellVolt totalCellVolt={totalCellVolt} packData={packData} />
        )}
      </Style.VoltBox>
    </Style.Container>
  );
};

ModalCellVolt.propTypes = {
  packData: PropTypes.object,
};

export default ModalCellVolt;
