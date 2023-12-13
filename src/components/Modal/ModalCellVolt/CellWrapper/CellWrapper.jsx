import styled from "styled-components";
import PropTypes from "prop-types";

const CellWrapper = ({ cellVolt, cellNumber, minCellVolt, maxCellVolt }) => {
  // 각 셀 전압 상태를 표현하는 컴포넌트
  const percentage = (cellVolt / 5) * 100;
  const percentageMin = (minCellVolt / 5) * 100;
  const percentageMax = (maxCellVolt / 5) * 100;

  return (
    <Container>
      <h4>cell {cellNumber}</h4>
      {minCellVolt || maxCellVolt ? (
        <Cell>
          <div style={{ width: `${percentageMin ? percentageMin : percentageMax}%` }}></div>
          <span>{minCellVolt ? minCellVolt : maxCellVolt} V</span>
        </Cell>
      ) : (
        <Cell>
          <div style={{ width: `${percentage}%` }}></div>
          <span>{cellVolt} V</span>
        </Cell>
      )}
    </Container>
  );
};

CellWrapper.propTypes = {
  cellVolt: PropTypes.number,
  cellNumber: PropTypes.number,
  minCellVolt: PropTypes.number,
  maxCellVolt: PropTypes.number,
};

export default CellWrapper;

const Container = styled.div`
  min-width: 195px;
  width: 40%;
  height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Cell = styled.div`
  position: relative;
  width: 120px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;
  background-color: transparent;
  & > span {
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.black};
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    right: -6px;
    width: 6px;
    height: 12px;
    background-color: ${({ theme }) => theme.colors.black};
    border-radius: 3px;
  }
  & > div {
    position: absolute;
    left: 0;
    height: 100%;
    background-color: #5be12c;
    opacity: 0.6;
  }
`;
