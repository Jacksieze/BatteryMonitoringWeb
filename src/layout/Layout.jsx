import Style from "./Layout.style";
import Logo from "../assets/ci-blue-out.png";
import MonitorPage from "../pages/MonitorPage";
import "boxicons";
import { useNavigate } from "react-router-dom";
import { useWebsocket } from "../api/webSocket";
import { useWebsocketData } from "../hooks/websocket/useWebsocketData";

const Layout = () => {
  const navigate = useNavigate();
  const { ws } = useWebsocket();
  const { isConnected, packData } = useWebsocketData();

  const handleLogout = () => {
    // 로그아웃 핸들러
    if (window.confirm("로그아웃 하시겠습니까?")) {
      alert("로그아웃 되었습니다.");
      navigate("/"); // 로그아웃 시 로그인 페이지로 이동
    }
  };

  // console.log("layout readyState:", socket.readyState);

  return (
    <>
      <Style.Header $connection={isConnected}>
        <h1>
          <img src={Logo} alt="mobi logo" />
        </h1>
        <div>
          <p>{isConnected ? "Server Connected" : "Server Disconnected"}</p>
          <button onClick={handleLogout}>
            <box-icon name="exit" color="#ffffff"></box-icon>
          </button>
        </div>
      </Style.Header>
      <Style.Main>
        <MonitorPage socket={ws} packData={packData} />
      </Style.Main>
    </>
  );
};

export default Layout;
