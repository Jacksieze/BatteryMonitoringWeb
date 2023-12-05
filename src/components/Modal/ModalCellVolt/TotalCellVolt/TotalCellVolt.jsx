import styled from "styled-components";
import PropTypes from "prop-types";
import GaugeComponent from "react-gauge-component";
import CellWrapper from "../CellWrapper/CellWrapper";

const TotalCellVolt = ({ totalCellVolt, randomCellVolt }) => {
  // 전체 셀 전압을 표현하는 컴포넌트
  const maxCellVolt = Math.max(...randomCellVolt);
  const minCellVolt = Math.min(...randomCellVolt);

  return (
    <Container>
      <AverageVolt>
        <GaugeComponent
          id="TotalCellVolt"
          value={totalCellVolt}
          maxValue={70}
          type="semicircle"
          labels={{
            valueLabel: {
              style: { display: "none" },
            },
            tickLabels: {
              type: "inner",
              // ticks: [{ value: 36.4 }, { value: 58.8 }],
              defaultTickValueConfig: {
                formatTextValue: (value) => `${value}V`,
                maxDecimalDigits: 1,
              },
              defaultTickLineConfig: {
                style: { fontSize: 10 },
              },
            },
          }}
          arc={{
            colorArray: ["#EA4228", "#F7E400", "#EA4228"],
            subArcs: [{ length: 0.15 }, { length: 0.7 }, { length: 0.15 }],
            padding: 0.02,
            width: 0.1,
          }}
          pointer={{
            type: "blob",
            baseColor: "#053273",
            width: 24,
            elastic: true,
            animationDelay: 0,
          }}
        />
        <AverageVoltText>
          <h3>전압 :</h3>
          <span>{totalCellVolt} V</span>
        </AverageVoltText>
      </AverageVolt>
      <MinMaxVolt>
        <MinMaxBox>
          <h3>최소 전압 :</h3>
          <CellWrapper minCellVolt={minCellVolt} />
        </MinMaxBox>
        <MinMaxBox>
          <h3>최대 전압 :</h3>
          <CellWrapper maxCellVolt={maxCellVolt} />
        </MinMaxBox>
      </MinMaxVolt>
    </Container>
  );
};

TotalCellVolt.propTypes = {
  totalCellVolt: PropTypes.number,
  randomCellVolt: PropTypes.array,
};

export default TotalCellVolt;

const Container = styled.div`
  width: 100%;
  height: 128px;
  display: flex;
`;
const AverageVolt = styled.div`
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  margin-top: -10px;
  & > #TotalCellVolt {
    width: calc(100% - 20px);
    display: flex;
    justify-content: center;
  }
  @media (${({ theme }) => theme.media.tablet}) {
    margin-left: 0;
  }
`;
const AverageVoltText = styled.div`
  width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -15px;
  & > h3 {
    font-size: 1.2rem;
  }
  & > span {
    font-size: 1.2rem;
  }
  @media (${({ theme }) => theme.media.tablet}) {
    margin-top: 0;
    & > #TotalCellVolt {
      width: 100%;
    }
  }
`;
const MinMaxVolt = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const MinMaxBox = styled.div`
  width: 100%;
  height: 50%;
  & > h3 {
    font-size: 1.1rem;
  }
`;
