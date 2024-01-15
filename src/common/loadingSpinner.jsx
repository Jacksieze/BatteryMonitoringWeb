import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default LoadingSpinner;

const Container = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.03);
`;
const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  border: 5px solid #fff;
  border-top: 5px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${loading} 1s linear infinite;
`;
