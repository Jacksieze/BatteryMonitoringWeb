import { useState, useRef, createRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import BatteryCard from "./BatteryCard";
import PaginationDots from "./PagingDots";

const BatteryModules = ({ setIsModalOpen }) => {
  // 배터리 팩 총괄하는 컴포넌트
  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 반응형 상태 관리
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const debounce = (func, delay) => {
    // 스크롤 성능 최적화를 위한 debounce
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
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

  const cards = Array(cardCount)
    .fill()
    .map((_, index) => <BatteryCard key={index} handleModalOpen={handleModalOpen} ref={cardRefs.current[index]} />);

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
