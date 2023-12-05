import styled from "styled-components";
import PropTypes from "prop-types";
import Logo from "../../../assets/ci-blue-out.png";
import "boxicons";

const ModalHead = ({ handleModalClose }) => {
  // 모달 헤더 컴포넌트
  return (
    <>
      <StatusContainer>
        <div>
          <span>배터리 ##</span>
        </div>
        <div>
          <span>상태 :</span>
          <span style={{ color: "green" }}>충전</span>
        </div>
      </StatusContainer>
      <LogoBox>
        <img src={Logo} alt="mobi logo" />
      </LogoBox>
      <Button onClick={handleModalClose}>
        <box-icon name="x" color="#053273"></box-icon>
      </Button>
    </>
  );
};

ModalHead.propTypes = {
  handleModalClose: PropTypes.func,
};

export default ModalHead;

const StatusContainer = styled.div`
  width: 483px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #ffffff;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
    & > span {
      font-size: 20px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;
const LogoBox = styled.div`
  width: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 90px;
  }
  @media (${({ theme }) => theme.media.mobile}) {
    margin-bottom: 10px;
  }
`;
const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  & > box-icon {
    width: 100%;
    height: 100%;
  }
`;
