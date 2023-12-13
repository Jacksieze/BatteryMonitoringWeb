import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import GaugeComponent from "react-gauge-component";

const ModalAmpere = ({ packData }) => {
  // 모달창의 전류 컴포넌트
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(packData.current);
  }, [packData]);
  // 랜덤 전류값
  // const [randomAmpere, setRandomAmpere] = useState(0);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setRandomAmpere(Number((Math.random() * 200 - 100).toFixed(2)));
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);
  // -----------------------------

  return (
    <Container>
      <GaugeComponent
        id="Ampere"
        value={current}
        maxValue={100}
        minValue={-100}
        type="semicircle"
        labels={{
          valueLabel: {
            style: { display: "none" },
          },
          tickLabels: {
            ticks: [{ value: -100 }, { value: -50 }, { value: 0 }, { value: 50 }, { value: 100 }],
            defaultTickValueConfig: {
              formatTextValue: (value) => `${value}A`,
              style: { fontSize: 9 },
              maxDecimalDigits: 1,
            },
            defaultTickLineConfig: {
              style: { fontSize: 9 },
            },
          },
        }}
        arc={{
          colorArray: ["#053273", "#E84D31", "#F7E400", "#5BE12C", "#053273"],
          subArcs: [{ length: 0.1 }, { length: 0.35 }, { length: 0.1 }, { length: 0.35 }, { length: 0.1 }],
          padding: 0.02,
          width: 0.1,
        }}
        pointer={{
          elastic: true,
          animationDelay: 0,
        }}
      />
      <AmpereText>
        <h1>전류 : </h1>
        <span>{current} A</span>
      </AmpereText>
    </Container>
  );
};

ModalAmpere.propTypes = {
  packData: PropTypes.object,
};

export default ModalAmpere;

const Container = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
  & > #Ampere {
    width: 90%;
    display: flex;
    justify-content: center;
    @media (${({ theme }) => theme.media.tablet}) {
      width: 100%;
    }
  }
  @media (${({ theme }) => theme.media.mobile}) {
    padding: 20px 0;
    & > #Ampere {
      width: 60%;
    }
  }
`;
const AmpereText = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -12px;
  & > h1 {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.black};
  }
  & > span {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.black};
  }
  @media (${({ theme }) => theme.media.tablet}) {
    margin-top: 0;
  }
`;
