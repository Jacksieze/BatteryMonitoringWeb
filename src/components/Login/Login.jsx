import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Login.style";
import LogoRound from "../../assets/모비-out-스티커.png";
import "boxicons";

const Login = () => {
  const [userId, setUserId] = useState("admin");
  const [password, setPassword] = useState("test1234");
  const [error, setError] = useState(null);
  const [toggleType, setToggleType] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // 로그인 핸들러
    if (userId === "admin" && password === "test1234") {
      alert(`어서오세요 ${userId}님`);
      navigate("/monitor"); // 로그인 성공 시 모니터 페이지로 이동
    } else {
      alert("로그인 실패");
      setError("아이디 또는 비밀번호를 다시 확인해주세요.");
      e.preventDefault();
    }
  };

  const handleToggleType = () => {
    // 비밀번호 보이기/숨기기
    setToggleType(!toggleType);
  };

  return (
    <Style.Container>
      <Style.LogoBox>
        <img src={LogoRound} alt="Main Logo" />
      </Style.LogoBox>
      <Style.LoginForm>
        <Style.InputBox>
          <div>
            <box-icon name="user" type="solid" color="#fff"></box-icon>
          </div>
          <input
            type="text"
            id="userId"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Style.InputBox>
        <Style.InputBox>
          <div>
            <box-icon name="lock-alt" type="solid" color="#fff"></box-icon>
          </div>
          <input
            type={toggleType ? "text" : "password"}
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <box-icon
            name={toggleType ? "hide" : "show"}
            onClick={handleToggleType}
            color="#555"
            style={{ position: "absolute", right: 10, cursor: "pointer" }}></box-icon>
          {error && <p>{error}</p>}
        </Style.InputBox>
        <Style.LoginBtn onClick={handleLogin}>LOGIN</Style.LoginBtn>
      </Style.LoginForm>
    </Style.Container>
  );
};

export default Login;
