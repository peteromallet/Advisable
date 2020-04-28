import styled from "styled-components";
import { space } from "styled-system";
import theme from "../../theme";

export const StyledAvailability = styled.div`
  ${space}

  width: 100%;
`;

export const StyledAvailabilityScrollContainer = styled.div`
  &::-moz-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledAvailabilityDay = styled.div`
  width: 50px;
  display: flex;
  user-select: none;
  padding-top: 16px;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  height: ${(props) => (props.hasAvailability ? "90px" : "70px")};
  background: ${(props) =>
    props.hasAvailability ? theme.colors.blue[1] : theme.colors.neutral[1]};
`;

export const StyledTimeCheckbox = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 50%;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  color: white;
  border: 2px solid ${theme.colors.neutral[3]};
  transition: background-color 200ms, border-color 200ms;

  svg {
    opacity: 0;
    transform: scale(0);
    transition: opacity 200ms, transform 200ms;
  }
`;

export const StyledTime = styled.label`
  width: 100%;
  display: flex;
  user-select: none;
  padding: 16px 20px;
  position: relative;
  align-items: center;
  color: ${theme.colors.neutral[9]};
  text-transform: lowercase;

  input {
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
  }

  input:checked + ${StyledTimeCheckbox} {
    border-color: ${theme.colors.blue[7]};
    background-color: ${theme.colors.blue[7]};

    svg {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default StyledAvailability;
