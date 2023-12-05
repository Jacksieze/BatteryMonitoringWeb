import { useEffect, useState } from "react";
import styled from "styled-components";

const ModalTemperature = () => {
  // 배터리 팩의 온도를 표현하는 컴포넌트
  const [randomTemp, setRandomTemp] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomTemp(Math.floor(Math.random() * 20) + 12);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <h3>온도 : </h3>
      <span>{randomTemp} C˚</span>
    </Container>
  );
};

export default ModalTemperature;

const Container = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  & > h3 {
    font-size: 24px;
  }
  & > span {
    font-size: 24px;
  }
  @media (${({ theme }) => theme.media.mobile}) {
    padding: 20px 0;
  }
`;
