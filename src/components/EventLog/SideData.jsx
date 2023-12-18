import styled from "styled-components";
import PropTypes from "prop-types";
import LogData from "./LogData/LogData";
import TotalVolt from "./TotalVolt/TotalVolt";

const SideData = ({ packData }) => {
  // 배터리 팩들의 전체전압과 이벤트 로그를 보여주는 컴포넌트
  return (
    <Container>
      <TotalVolt packData={packData} />
      <LogData packData={packData} />
    </Container>
  );
};

SideData.propTypes = {
  packData: PropTypes.object,
};

export default SideData;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 576px;
  width: 100%;
  @media (${({ theme }) => theme.media.desktop}) {
    max-width: 100%;
    gap: 50px 20px;
  }
`;
