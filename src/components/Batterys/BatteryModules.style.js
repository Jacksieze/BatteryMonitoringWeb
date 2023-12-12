import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 594px;
  @media (${({ theme }) => theme.media.desktop}) {
    max-width: 100%;
    overflow-x: auto;
    gap: 20px;
    padding: 16px 20px;
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
  @media (${({ theme }) => theme.media.mobile}) {
    padding: 16px 20px 20px;
  }
`;
const CradleWrapper = styled.div`
  width: 1240px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  @media (${({ theme }) => theme.media.desktop}) {
    flex-wrap: nowrap;
  }
`;
const CradleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`;

const Style = { Container, CradleWrapper, CradleBox };

export default Style;
