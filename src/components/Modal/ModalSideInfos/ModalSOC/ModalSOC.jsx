import styled from "styled-components";
import Battery from "./Battery";

const ModalSOC = () => {
  // 모달의 SOC를 렌더링하는 컴포넌트
  return (
    <Container>
      <Battery />
      <h1>SoC</h1>
    </Container>
  );
};

export default ModalSOC;

const Container = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
  & > h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.black};
  }
`;
