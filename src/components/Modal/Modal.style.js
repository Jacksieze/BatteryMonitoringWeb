import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.div`
  position: relative;
  width: 850px;
  height: 580px;
  background-color: ${({ theme }) => theme.colors.gray};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;
  @media ${({ theme }) => theme.media.tablet} {
    transition: all 0.3s ease-in-out;
    transform: scale(0.7);
  }
  @media ${({ theme }) => theme.media.mobile} {
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    transform: scale(0.55);
  }
`;
const ModalHeader = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  @media ${({ theme }) => theme.media.mobile} {
    height: 120px;
    flex-direction: column-reverse;
  }
`;
const ModalBody = styled.div`
  width: 100%;
  height: 468px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.media.mobile} {
    height: 100%;
    flex-direction: column;
  }
`;

const Style = { Modal, ModalContainer, ModalHeader, ModalBody };

export default Style;
