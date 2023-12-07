import { useState, useRef, createRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import BatteryCard from "./BatteryCard";
import PaginationDots from "./PagingDots";
import { useWindowWidth } from "../../hooks/windowWidth/useWindowWidth";
import { debounce } from "../../util/debounce";

const BatteryModules = ({ setIsModalOpen }) => {
  // 배터리 팩 총괄하는 컴포넌트
  const [currentPage, setCurrentPage] = useState(0);
  const windowWidth = useWindowWidth();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleScroll = debounce((e) => {
    // 모바일 화면에서 스크롤 이벤트 발생 시 위치 계산
    const element = e.target;
    const nextPage = Math.round((element.scrollLeft / element.scrollWidth) * cardCount);
    setCurrentPage(nextPage);
    handlePaginationClick(nextPage);
  }, 100);

  const cardCount = 4;
  const cardRefs = useRef(
    // 배터리 팩 카드의 위치를 계산하기 위한 useRef
    Array(cardCount)
      .fill()
      .map(() => createRef())
  );
  const createCards = (cardCount, handleModalOpen, cardRefs) => {
    return Array(cardCount)
      .fill()
      .map((_, index) => <BatteryCard key={index} handleModalOpen={handleModalOpen} ref={cardRefs.current[index]} />);
  };

  const cards = createCards(cardCount, handleModalOpen, cardRefs);

  const handlePaginationClick = (page) => {
    // 페이지네이션 클릭 시 해당 배터리 팩으로 이동
    if (windowWidth <= 500) {
      cardRefs.current[page].current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    setCurrentPage(page);
  };

  return (
    <>
      <Container onScroll={handleScroll}>
        <CradleWrapper>{cards}</CradleWrapper>
      </Container>
      {windowWidth <= 500 && (
        <PaginationDots currentPage={currentPage} totalPages={cardCount} onPageChange={handlePaginationClick} />
      )}
    </>
  );
};

BatteryModules.propTypes = {
  setIsModalOpen: PropTypes.func,
};

export default BatteryModules;

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
