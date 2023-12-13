import styled from "styled-components";

const Container = styled.div`
  width: 273px;
  height: 330px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 16px rgba(0, 0, 255, 0.3);
    transform: scale(1.03);
    transition: all 0.3s ease-in-out;
    @media (${({ theme }) => theme.media.tablet}) {
      transform: scale(1);
      box-shadow: none;
    }
  }
  @media (${({ theme }) => theme.media.tablet}) {
    width: 240px;
    height: 297px;
  }
`;
const CardHeader = styled.div`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    margin-left: 20px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 20px;
  }
  & > h4 {
    margin-right: 20px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 18px;
  }
  @media (${({ theme }) => theme.media.tablet}) {
    height: 40px;
    & > h3 {
      font-size: 18px;
    }
  }
`;
const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 14px;
`;
const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  & > h4 {
    margin-right: 10px;
    color: ${({ theme }) => theme.colors.black};
    width: 50%;
    text-align: end;
  }
  & > p {
    color: ${({ theme }) => theme.colors.black};
    width: 50%;
    text-align: center;
  }
  @media (${({ theme }) => theme.media.tablet}) {
    & > h4 {
      font-size: 14px;
    }
    & > p {
      font-size: 14px;
    }
  }
`;
const CardLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const Style = { Container, CardHeader, CardBody, CardContent, CardLoading };

export default Style;
