/* eslint-disable indent */

import { useState, useRef, createRef, useMemo, useCallback } from "react";
import Style from "./BatteryModules.style";
import PropTypes from "prop-types";
import BatteryCard from "./BatteryCard";
import PaginationDots from "./PagingDots";
import { useWindowWidth } from "../../hooks/windowWidth/useWindowWidth";
import { debounce } from "../../util/debounce";
import { useWebsocketData } from "../../hooks/websocket/useWebsocketData";

const BatteryModules = ({ setIsModalOpen }) => {
  const { packDataArray } = useWebsocketData();
  // 배터리 팩 총괄하는 컴포넌트
  const [currentPage, setCurrentPage] = useState(0);
  const windowWidth = useWindowWidth();

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const handleScroll = debounce((e) => {
    // 모바일 화면에서 스크롤 이벤트 발생 시 위치 계산s
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

  const sortedPackDataArray = useMemo(() => {
    return [...packDataArray].sort((a, b) => a.cradleId - b.cradleId);
  }, [packDataArray]);

  const cradles = useMemo(
    () =>
      Array.from({ length: cardCount }, (_, index) => {
        const pack = sortedPackDataArray[index] || { data: null };
        console.log(pack);
        return (
          <Cradle key={index} cradleId={index}>
            <BatteryCard
              key={index}
              data={pack.data}
              handleModalOpen={() => handleModalOpen(pack.packId)}
              ref={cardRefs.current[index]}
            />
          </Cradle>
        );
      }),
    [sortedPackDataArray, cardCount, handleModalOpen]
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
        <Style.CradleWrapper>{cradles}</Style.CradleWrapper>
      </Style.Container>
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

const Cradle = ({ children }) => <Style.CradleBox>{children}</Style.CradleBox>;
Cradle.propTypes = {
  children: PropTypes.node,
};
