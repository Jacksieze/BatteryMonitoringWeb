import { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CradleInfo from "../components/Cradle/CradleInfo";
import BatteryModules from "../components/Batterys/BatteryModules";
import SideData from "../components/EventLog/SideData";
import Modal from "../components/Modal/Modal";

const MonitorPage = ({ socket, packData }) => {
  // 모니터 페이지의 모든 컴포넌트를 렌더링하는 페이지
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState(null); // 선택한 배터리 팩의 데이터

  const handleModalOpen = useCallback((packId) => {
    setSelectedPackId(packId);
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} packData={packData} packId={selectedPackId} socket={socket} />
      )}
      <CradleInfo />
      <Container>
        <BatteryModules handleModalOpen={handleModalOpen} packData={packData} />
        <SideData packData={packData} />
      </Container>
    </>
  );
};

MonitorPage.propTypes = {
  socket: PropTypes.object,
  packData: PropTypes.object,
};

export default MonitorPage;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  @media (${({ theme }) => theme.media.tablet}) {
    justify-content: center;
    gap: 10px;
  }
`;
