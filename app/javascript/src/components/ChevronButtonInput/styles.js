import styled, { keyframes } from "styled-components";
import { variant } from "styled-system";
import { theme } from "@advisable/donut";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
`;

export const Loading = styled.div`
  color: ${theme.colors.blue900};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: ${spin} 700ms linear infinite;
  transform: rotate(0deg);
`;

const size = variant({
  prop: "size",
  variants: {
    m: {
      minHeight: "48px",
    },
    l: {
      minHeight: "64px",
    },
  },
});

const StyledChevronInputOption = styled.button`
  ${size}

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border: none;
  padding: 12px 12px 12px 24px;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  appearance: none;
  border-radius: 12px;
  color: ${theme.colors.neutral500};
  background: #eff0f3;
  box-shadow: inset 0px 0px 0px 0px ${theme.colors.blue500};

  &:disabled {
    color: ${theme.colors.neutral300};
    opacity: 0.8;
  }
  &:disabled span {
    color: ${theme.colors.neutral300};
  }
  &:hover:disabled {
    box-shadow: none;
  }

  & span {
    color: ${theme.colors.neutral700};
  }

  &:hover {
    box-shadow: inset 0px 0px 0px 2px ${theme.colors.neutral300};
    cursor: pointer;
  }

  &[data-selected="true"] {
    color: ${theme.colors.blue900};
    transition: 0.3s box-shadow, 0.3s background;
    background: ${theme.colors.blue100};
    box-shadow: inset 0px 0px 0px 2px ${theme.colors.blue900};
  }

  &[data-selected="true"] span {
    color: ${theme.colors.blue900};
  }

  &[data-submitting="true"] {
    cursor: wait;
  }
`;

StyledChevronInputOption.defaultProps = {
  size: "l",
};

export default StyledChevronInputOption;
