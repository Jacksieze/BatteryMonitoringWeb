import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GaugeComponent from "react-gauge-component";
import styled from "styled-components";

const TotalVolt = ({ packData }) => {
  // 배터리 팩들의 전체전압을 보여주는 컴포넌트
  const [totalVolt, setTotalVolt] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!packData) return;
      const total = Object.values(packData).reduce((sum, pack) => {
        return sum + pack.packVoltage;
      }, 0);
      setTotalVolt(total);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [packData]);

  return (
    <Container>
      <GaugeComponent
        id="TotalVolt"
        value={totalVolt}
        maxValue={280}
        type="radial"
        labels={{
          valueLabel: {
            formatTextValue: (value) => `${value} V`,
            style: { fontSize: 32, fill: "#B5CDEA" },
            maxDecimalDigits: 1,
          },
          tickLabels: {
            // ticks: [{ value: 145.6 }, { value: 235.2 }],
            defaultTickValueConfig: {
              formatTextValue: (value) => `${value}V`,
              style: { fontSize: 16 },
              maxDecimalDigits: 1,
            },
          },
        }}
        arc={{
          colorArray: ["#EA4228"],
          subArcs: Array(100).fill({ length: 0.01 }),
          padding: 0.02,
          width: 0.3,
        }}
        pointer={{
          color: "#053273",
          elastic: true,
          animationDelay: 0,
        }}
      />
    </Container>
  );
};

TotalVolt.propTypes = {
  packData: PropTypes.object,
};

export default TotalVolt;

const Container = styled.div`
  display: flex;
  align-items: center;
  max-width: 576px;
  height: 334px;
  & > #TotalVolt {
    width: 480px;
  }
  @media (${({ theme }) => theme.media.tablet}) {
    height: 250px;
    & > #TotalVolt {
      width: 100%;
    }
  }
`;
