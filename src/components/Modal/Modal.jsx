import { useEffect } from "react";
import Style from "./Modal.style";
import PropTypes from "prop-types";
import ModalHead from "./ModalHead/ModalHead";
import ModalCellVolt from "./ModalCellVolt/ModalCellVolt";
import ModalSideInfos from "./ModalSideInfos/ModalSideInfos";

const Modal = ({ setIsModalOpen, packData, packId, socket }) => {
  // 모달 컴포넌트
  const data = packData[`packData${packId}`];
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const currentPackData = packData[`packData${packId}`];
    if (!currentPackData) {
      alert("배터리 팩이 해제되었습니다.");
      setIsModalOpen(false);
    }
  }, [packData, packId, setIsModalOpen]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Style.Modal onClick={handleModalClose}>
      <Style.ModalContainer onClick={handleModalClick}>
        <Style.ModalHeader>
          <ModalHead handleModalClose={handleModalClose} packData={data} />
        </Style.ModalHeader>
        <Style.ModalBody>
          <ModalCellVolt packData={data} />
          <ModalSideInfos packData={data} socket={socket} />
        </Style.ModalBody>
      </Style.ModalContainer>
    </Style.Modal>
  );
};

Modal.propTypes = {
  setIsModalOpen: PropTypes.func,
  packId: PropTypes.number,
  packData: PropTypes.object,
  socket: PropTypes.object,
};

export default Modal;
