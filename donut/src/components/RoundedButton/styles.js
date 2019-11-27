import { lighten, darken } from "polished";
import styled, { css, keyframes } from "styled-components";
import { space } from "styled-system";
import theme from "../../theme";

const spin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(359deg);
  }
`;

export const Loading = styled.div`
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  position: absolute;
  transform: translate(-50%, -50%);
  animation: ${spin} 700ms infinite linear;
`;

const VARIANTS = {
  primary: css``,
  secondary: css`
    color: ${theme.colors.neutral[7]};
    background: ${theme.colors.neutral[1]};

    &:not(:disabled):hover {
      color: ${theme.colors.neutral[8]};
      background: ${darken(0.02, theme.colors.neutral[1])};
    }

    &:not(:disabled):active {
      color: ${theme.colors.neutral[8]};
      background: ${lighten(0.02, theme.colors.neutral[1])};
    }
  `,
};

export const StyledButton = styled.button`
  ${space}

  border: none;
  color: white;
  height: 40px;
  outline: none;
  line-height: 1;
  cursor: pointer;
  font-size: 15px;
  padding: 0 25px;
  appearance: none;
  font-weight: 500;
  user-select: none;
  position: relative;
  border-radius: 20px;
  align-items: center;
  display: inline-flex;
  font-family: poppins;
  letter-spacing: -0.01em;
  width: ${props => props.width};
  background: ${theme.colors.blue[5]};
  transition: background 100ms, color 100ms;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &:not(:disabled):hover {
    background: ${theme.colors.blue[7]};
  }

  &:not(:disabled):active {
    background: ${theme.colors.blue[6]};
  }

  ${props => VARIANTS[props.variant || "primary"]}
  ${props => props.isLoading && { color: "transparent" }}
`;

export default StyledButton;
