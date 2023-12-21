import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Battery = ({ packData }) => {
  // 배터리 용량을 표현하는 컴포넌트
  const [level, setLevel] = useState(0);

  useEffect(() => {
    setLevel(packData.soc);
  }, [packData]);

  return (
    <Container $level={level}>
      <div></div>
      <span>{level} %</span>
    </Container>
  );
};

Battery.propTypes = {
  packData: PropTypes.object,
};

export default Battery;

const Container = styled.div`
  position: relative;
  width: 236px;
  height: 65px;
  border: 4px solid ${({ theme }) => theme.colors.black};
  border-radius: 10px;
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 30px;
    border-radius: 0 5px 5px 0;
    background-color: ${({ theme }) => theme.colors.black};
    top: 25%;
    right: -10px;
  }
  & > div {
    position: absolute;
    width: ${({ $level }) => $level}%;
    height: 100%;
    border-radius: 7px;
    background-color: ${({ $level }) => ($level < 33 ? "#E84D31" : $level < 66 ? "#F7E400" : "#5BE12C")};
    top: 0;
    left: 0;
    opacity: 0.8;
  }
  & > span {
    position: absolute;
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.black};
    top: 45%;
    left: 55%;
    transform: translate(-50%, -50%);
  }
`;
