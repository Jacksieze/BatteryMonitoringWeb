import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 346px;
  height: 250px;
  margin: 0 auto;
  background-color: #b5cdea60;
  backdrop-filter: blur(2px);
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  @media ${({ theme }) => theme.media.mobile} {
    transform: scale(0.9);
  }
`;
const LogoBox = styled.div`
  position: absolute;
  top: -66px;
  left: 31%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 132px;
  height: 132px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  height: 100%;
`;
const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 286px;
  height: 36px;
  & > div {
    width: 15%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 6px 0 0 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > input {
    width: 85%;
    height: 100%;
    padding: 0 10px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 0 6px 6px 0;
    font-size: 14px;
    outline: none;
  }
  & > p {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.negative};
  }
`;
const LoginBtn = styled.button`
  width: 130px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.colors.white};
  margin: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease-in-out;
  }
`;

const Style = { Container, LogoBox, LoginForm, InputBox, LoginBtn };

export default Style;
