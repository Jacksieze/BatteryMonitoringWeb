import styled from "styled-components";

const CradleInfo = () => {
  // 배터리 크래들 정보를 보여주는 컴포넌트
  return (
    <Container>
      <h2>Mobi Cradle BMS Monitor Service</h2>
      <p>This service is designed to monitor the status of the Mobi Cradle BMS.</p>
    </Container>
  );
};

export default CradleInfo;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 30px 0;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 20px 0;
  & > h2 {
    padding-left: 40px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 24px;
  }
  & > p {
    padding-left: 40px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
  }
  @media (${({ theme }) => theme.media.tablet}) {
    margin-top: 0;
    border-radius: 0;
    box-shadow: none;
    & > h2 {
      padding: 0 20px;
      font-size: 18px;
    }
    & > p {
      padding: 0 20px;
      font-size: 12px;
    }
  }
`;
