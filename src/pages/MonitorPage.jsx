import { useState, useCallback } from "react";
import { useWebsocket } from "../api/webSocket";
import styled from "styled-components";
import CradleInfo from "../components/Cradle/CradleInfo";
import BatteryModules from "../components/Batterys/BatteryModules";
import SideData from "../components/EventLog/SideData";
import Modal from "../components/Modal/Modal";

const MonitorPage = () => {
  useWebsocket(); // 웹소켓 연결
  // 모니터 페이지의 모든 컴포넌트를 렌더링하는 페이지
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackData, setSelectedPackData] = useState(null); // 선택한 배터리 팩의 데이터

  const handleModalOpen = useCallback((packData) => {
    setSelectedPackData(packData);
    setIsModalOpen(true);
  }, []);

  return (
    <>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} packData={selectedPackData} />}
      <CradleInfo />
      <Container>
        <BatteryModules handleModalOpen={handleModalOpen} />
        <SideData />
      </Container>
    </>
  );
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
