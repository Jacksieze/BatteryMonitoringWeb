import styled from "styled-components";
import PropTypes from "prop-types";
import ModalSOC from "./ModalSOC/ModalSOC";
import ModalAmpere from "./ModalAmpere/ModalAmpere";
import ModalTemperature from "./ModalTemperature/ModalTemperature";
import ButtonSwitch from "./ButtonSwitch/ButtonSwitch";

const ModalSideInfos = ({ packData }) => {
  // 모달의 사이드 정보들을 렌더링하는 컴포넌트
  return (
    <Container>
      <ButtonSwitch packData={packData} />
      <InfoContainer>
        <ModalSOC packData={packData} />
        <ModalAmpere packData={packData} />
        <ModalTemperature packData={packData} />
      </InfoContainer>
    </Container>
  );
};

ModalSideInfos.propTypes = {
  packData: PropTypes.object,
};

export default ModalSideInfos;

const Container = styled.div`
  width: 335px;
  height: calc(100% + 20px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 20px;
  @media (${({ theme }) => theme.media.mobile}) {
    flex-direction: column-reverse;
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;
const InfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 20px;
`;
