import styled from "styled-components";

const ButtonSwitch = () => {
  return (
    <Container>
      <ToggleWrapper>
        <Label>충전</Label>
        <Toggle type="checkbox" label="충전" />
      </ToggleWrapper>
      <ToggleWrapper>
        <Label>방전</Label>
        <Toggle type="checkbox" label="방전" />
      </ToggleWrapper>
    </Container>
  );
};

export default ButtonSwitch;

const Container = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  padding: 20px 40px;
  @media (${({ theme }) => theme.media.mobile}) {
    height: 50px;
    justify-content: space-around;
  }
`;
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 4px;
`;
const Toggle = styled.input`
  &[type="checkbox"] {
    position: relative;
    width: 80px;
    height: 40px;
    margin: 0;
    appearance: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.gray};
    border-radius: 50px;
    cursor: pointer;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
  }
  &[type="checkbox"]:checked {
    background-color: ${({ theme, label }) => (label === "충전" ? theme.colors.positive : theme.colors.negative)};
  }
  &[type="checkbox"]:after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: left 0.3s ease;
  }
  &[type="checkbox"]:checked:after {
    left: 42px;
  }
`;
