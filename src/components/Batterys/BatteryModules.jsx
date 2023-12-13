/* eslint-disable indent */

import { useState, useRef, createRef, useMemo } from "react";
import Style from "./BatteryModules.style";
import PropTypes from "prop-types";
import BatteryCard from "./BatteryCard";
import PaginationDots from "./PagingDots";
import { useWindowWidth } from "../../hooks/windowWidth/useWindowWidth";
import { debounce } from "../../util/debounce";
import { useWebsocketData } from "../../hooks/websocket/useWebsocketData";

const BatteryModules = ({ handleModalOpen }) => {
  const { packData } = useWebsocketData();
  const cardCount = 4;
  const cardRefs = useRef(
    // 배터리 팩 카드의 위치를 계산하기 위한 useRef
    Array(cardCount)
      .fill()
      .map(() => createRef())
  );
  // 배터리 팩 총괄하는 컴포넌트
  const [currentPage, setCurrentPage] = useState(0);
  const windowWidth = useWindowWidth();

  const handleScroll = debounce((e) => {
    // 모바일 화면에서 스크롤 이벤트 발생 시 위치 계산
    const element = e.target;
    const nextPage = Math.round((element.scrollLeft / element.scrollWidth) * cardCount);
    setCurrentPage(nextPage);
    handlePaginationClick(nextPage);
  }, 100);

  const cards = useMemo(
    () =>
      Array.from({ length: cardCount }, (_, index) => {
        const packKey = `packData${index + 1}`;
        const pack = packData[packKey] || null;
        console.log(pack);
        return (
          <BatteryCard
            key={index}
            data={pack}
            handleModalOpen={() => handleModalOpen(pack && pack.packId)}
            ref={cardRefs.current[index]}
          />
        );
      }),
    [packData, cardCount, handleModalOpen]
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

  return (
    <>
      <Style.Container onScroll={handleScroll}>
        <Style.CradleWrapper>{cards}</Style.CradleWrapper>
      </Style.Container>
      {windowWidth <= 500 && (
        <PaginationDots currentPage={currentPage} totalPages={cardCount} onPageChange={handlePaginationClick} />
      )}
    </>
  );
};

BatteryModules.propTypes = {
  handleModalOpen: PropTypes.func,
};

export default BatteryModules;
