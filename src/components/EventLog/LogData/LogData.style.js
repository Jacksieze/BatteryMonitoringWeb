import styled from "styled-components";

const Container = styled.div`
  width: 576px;
  height: 330px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;
const LogHeader = styled.div`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  & > h3 {
    margin: 0 20px;
    color: ${({ theme }) => theme.colors.white};
    font-size: 20px;
  }
  & > button {
    margin-left: auto;
    margin-right: 20px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.white};
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
  }
  @media (${({ theme }) => theme.media.mobile}) {
    height: 40px;
    & > h3 {
      font-size: 18px;
    }
  }
`;
const LogBody = styled.div`
  padding: 0 8px;
  height: 275px;
  overflow-y: auto;
`;
const LogTable = styled.table`
  position: relative;
  border-collapse: collapse;
  width: 100%;
  & > thead > tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  }
  & > thead > tr > th {
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 8px 0 6px;
    text-align: center;
    @media (max-width: 576px) {
      padding: 6px 0 4px;
      font-size: 14px;
    }
  }
  & > tbody > tr > td {
    padding: 6px;
    font-size: 14px;
    @media (max-width: 576px) {
      padding: 4px;
      font-size: 12px;
    }
  }
  & > tbody > tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.placeholer};
  }
  & > tbody > tr > td:not(:last-child) {
    text-align: center;
  }
`;

const Style = { Container, LogHeader, LogBody, LogTable };

export default Style;
