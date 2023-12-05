import { useState, useEffect } from "react";
import { useWebsocket } from "../api/webSocket";
import styled from "styled-components";
import CradleInfo from "../components/Cradle/CradleInfo";
import BatteryModules from "../components/Batterys/BatteryModules";
import SideData from "../components/EventLog/SideData";
import Modal from "../components/Modal/Modal";

const MonitorPage = () => {
  // 모니터 페이지의 모든 컴포넌트를 렌더링하는 페이지
  const { isConnected, message } = useWebsocket();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 웹소켓 데이터 정리는 이곳에서 시작
    if (isConnected) {
      console.log("message: ", message);
    }
  }, [isConnected, message]);

  return (
    <>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      <CradleInfo />
      <Container>
        <BatteryModules setIsModalOpen={setIsModalOpen} />
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
