import styled from "styled-components";

const Container = styled.div`
  width: 451px;
  height: calc(100% - 20px);
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 20px;
  @media ${({ theme }) => theme.media.mobile} {
    width: calc(100% - 40px);
    margin-bottom: 20px;
  }
`;
const CellContainer = styled.div`
  width: 100%;
  height: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;
const VoltBox = styled.div`
  width: 100%;
  & > p {
    font-size: 20px;
    text-align: center;
  }
`;

const Style = { Container, CellContainer, VoltBox };

export default Style;
