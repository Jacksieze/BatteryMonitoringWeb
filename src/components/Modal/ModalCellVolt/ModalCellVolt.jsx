import { useState, useEffect } from "react";
import Style from "./ModalCellVolt.style";
import PropTypes from "prop-types";
import CellWrapper from "./CellWrapper/CellWrapper";
import TotalCellVolt from "./TotalCellVolt/TotalCellVolt";

const ModalCellVolt = ({ packData }) => {
  // 배터리 팩의 셀 전압 모달 컴포넌트
  const [isLoading, setIsLoading] = useState(true);
  const [cellVolt, setCellVolt] = useState(Array(14).fill("--"));
  const [totalCellVolt, setTotalCellVolt] = useState("--");

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (packData) {
      setIsLoading(false);
      setCellVolt(packData.cellVoltage);
      setTotalCellVolt(packData.packVoltage);
    }
  }, [packData]);

  return (
    <Style.Container>
      <Style.CellContainer>
        {isLoading ? (
          <p style={{ fontSize: 20 }}>불러오는 중 입니다...</p>
        ) : (
          Object.entries(cellVolt).map(([cell, voltage], index) => (
            <CellWrapper
              key={index}
              cellNumber={packData ? cell.replace("cell", "") : index + 1}
              cellVolt={voltage / 1000}
            />
          ))
        )}
      </Style.CellContainer>
      <Style.VoltBox>
        {isLoading ? (
          <p style={{ fontSize: 20, textAlign: "center" }}>잠시만 기다려주세요...</p>
        ) : (
          <TotalCellVolt totalCellVolt={totalCellVolt / 10} packData={packData} />
        )}
      </Style.VoltBox>
    </Style.Container>
  );
};

ModalCellVolt.propTypes = {
  packData: PropTypes.object,
};

export default ModalCellVolt;
