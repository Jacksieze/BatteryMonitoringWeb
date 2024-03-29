/* eslint-disable indent */

import { useState, useRef, createRef } from "react";
import Style from "./BatteryModules.style";
import PropTypes from "prop-types";
import BatteryCard from "./BatteryCard";
import PaginationDots from "./PagingDots";
import { useWindowWidth } from "../../hooks/windowWidth/useWindowWidth";
import { debounce } from "../../util/debounce";

const BatteryModules = ({ handleModalOpen, packData }) => {
  // 배터리 팩 총괄하는 컴포넌트
  const cardCount = 4;
  const cardRefs = useRef(
    // 배터리 팩 카드의 위치를 계산하기 위한 useRef
    Array(cardCount)
      .fill()
      .map(() => createRef())
  );
  const [currentPage, setCurrentPage] = useState(0);
  const windowWidth = useWindowWidth();

  const handleScroll = debounce((e) => {
    // 모바일 화면에서 스크롤 이벤트 발생 시 위치 계산
    const element = e.target;
    const nextPage = Math.round((element.scrollLeft / element.scrollWidth) * cardCount);
    setCurrentPage(nextPage);
    handlePaginationClick(nextPage);
  }, 100);

  const createBatteryCard = (cradleId, cradlePosition, ref) => {
    let currentBatteryData = null;
    for (const key in packData) {
      if (Object.hasOwnProperty.call(packData, key)) {
        const data = packData[key];
        if (data.cradleId === cradleId && data.cradlePosition === cradlePosition) {
          currentBatteryData = data;
          break;
        }
      }
    }

    return (
      <BatteryCard
        ref={ref}
        key={`${cradleId}-${cradlePosition}`}
        data={currentBatteryData ? currentBatteryData : {}}
        handleModalOpen={() => handleModalOpen(currentBatteryData ? currentBatteryData.packId : null)}
      />
    );
  };

  const handlePaginationClick = (page) => {
    // 페이지네이션 클릭 시 해당 배터리 팩으로 이동
    if (windowWidth <= 500 && cardRefs.current[page]?.current) {
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
        <Style.CradleWrapper>
          <Style.CradleBox>
            {createBatteryCard(1, 1, cardRefs.current[0])}
            {createBatteryCard(1, 2, cardRefs.current[1])}
          </Style.CradleBox>
          <Style.CradleBox>
            {createBatteryCard(2, 1, cardRefs.current[2])}
            {createBatteryCard(2, 2, cardRefs.current[3])}
          </Style.CradleBox>
        </Style.CradleWrapper>
      </Style.Container>
      {windowWidth <= 500 && (
        <PaginationDots currentPage={currentPage} totalPages={cardCount} onPageChange={handlePaginationClick} />
      )}
    </>
  );
};

BatteryModules.propTypes = {
  handleModalOpen: PropTypes.func,
  packData: PropTypes.object,
};

export default BatteryModules;
