import styled from "styled-components";
import PropTypes from "prop-types";

const PaginationDots = ({ currentPage, totalPages, onPageChange }) => {
  // 배터리 팩 페이지네이션을 보여주는 컴포넌트
  return (
    <DotsContainer>
      {Array(totalPages)
        .fill()
        .map((_, idx) => (
          <Dot key={idx} $isActive={idx === currentPage} onClick={() => onPageChange(idx)} />
        ))}
    </DotsContainer>
  );
};

export default PaginationDots;

PaginationDots.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "#053273" : "#B5CDEA")};
  margin: 0 5px;
`;
