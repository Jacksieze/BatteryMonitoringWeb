import styled from "styled-components";
import ModalSOC from "./ModalSOC/ModalSOC";
import ModalAmpere from "./ModalAmpere/ModalAmpere";
import ModalTemperature from "./ModalTemperature/ModalTemperature";

const ModalSideInfos = () => {
  // 모달의 사이드 정보들을 렌더링하는 컴포넌트
  return (
    <Container>
      <ModalSOC />
      <ModalAmpere />
      <ModalTemperature />
    </Container>
  );
};

export default ModalSideInfos;

const Container = styled.div`
  width: 293px;
  height: calc(100% - 20px);
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 20px;
  @media (${({ theme }) => theme.media.mobile}) {
    width: calc(100% - 40px);
    height: 100%;
  }
`;
