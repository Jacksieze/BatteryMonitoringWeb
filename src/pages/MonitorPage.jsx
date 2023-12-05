import { useState, useEffect } from "react";
import { useWebsocket } from "../api/webSocket";
import styled from "styled-components";
import CradleInfo from "../components/Cradle/CradleInfo";
import BatteryModules from "../components/Batterys/BatteryModules";
import SideData from "../components/EventLog/SideData";
import Modal from "../components/Modal/Modal";
import { useSelector } from "react-redux";

const MonitorPage = () => {
  useWebsocket();
  // 모니터 페이지의 모든 컴포넌트를 렌더링하는 페이지
  const data = useSelector((state) => state.data);
  const isConnected = useSelector((state) => state.connection);
  // const { isConnected } = useWebsocket();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 웹소켓 데이터 정리는 이곳에서 시작
  useEffect(() => {
    if (isConnected) {
      console.log("message: ", data.packId);
    }
  }, [isConnected, data]);

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
