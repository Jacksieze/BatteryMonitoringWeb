import Style from "./Layout.style";
import Logo from "../assets/ci-blue-out.png";
import MonitorPage from "../pages/MonitorPage";
import "boxicons";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 핸들러
    if (window.confirm("로그아웃 하시겠습니까?")) {
      alert("로그아웃 되었습니다.");
      navigate("/"); // 로그아웃 시 로그인 페이지로 이동
    }
  };

  return (
    <>
      <Style.Header>
        <h1>
          <img src={Logo} alt="mobi logo" />
        </h1>
        <button onClick={handleLogout}>
          <box-icon name="exit" color="#ffffff"></box-icon>
        </button>
      </Style.Header>
      <Style.Main>
        <MonitorPage />
      </Style.Main>
    </>
  );
};

export default Layout;
