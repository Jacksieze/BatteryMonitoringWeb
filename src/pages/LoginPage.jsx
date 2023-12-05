import Login from "../components/Login/Login";
import styled from "styled-components";
import LoginBG from "../assets/green-world.png";

const LoginPage = () => {
  return (
    <Container>
      <LoginBackground>
        <p>Moving Energy, Powering People, Sharing Tomorrow</p>
      </LoginBackground>
      <Login />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100dvh;
`;
const LoginBackground = styled.div`
  width: 100%;
  height: 90%;
  background-image: url(${LoginBG});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 0;
  z-index: -1;
  opacity: 0.4;
  & > p {
    width: 100%;
    position: absolute;
    bottom: -5%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.primary};
    font-size: 36px;
    font-weight: 700;
    text-align: center;
  }
  @media (${({ theme }) => theme.media.tablet}) {
    top: -5%;
    & > p {
      font-size: 22px;
      bottom: -5%;
    }
  }
`;
