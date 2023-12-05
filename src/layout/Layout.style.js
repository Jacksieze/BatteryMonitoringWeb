import styled from "styled-components";

const Header = styled.header`
  position: sticky;
  top: 0;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
  & > h1 {
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
      width: 100%;
    }
  }
  & > button {
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 6px;
    padding: 8px;
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.colors.tertiary};
    }
  }
  @media (${({ theme }) => theme.media.mobile}) {
    padding: 0 20px;
    & > h1 {
      width: 60px;
    }
  }
`;

const Main = styled.main`
  max-width: 1202px;
  margin: 0 auto 20px;
`;

const Style = { Header, Main };

export default Style;
