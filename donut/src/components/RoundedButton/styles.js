import { lighten, darken } from "polished";
import styled, { css, keyframes } from "styled-components";
import { space, layout } from "styled-system";
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
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
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
  ${layout}

  border: none;
  color: white;
  height: 48px;
  outline: none;
  line-height: 1;
  font-size: 16px;
  padding: 0 20px;
  appearance: none;
  font-weight: 500;
  user-select: none;
  position: relative;
  border-radius: 30px;
  align-items: center;
  white-space: nowrap;
  display: inline-flex;
  font-family: poppins;
  vertical-align: middle;
  justify-content: center;
  letter-spacing: -0.01em;
  background: ${theme.colors.blue[5]};
  transition: background 100ms, color 100ms;

  @media (min-width: ${theme.breakpoints.s}) {
    height: 38px;
    font-size: 15px;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &[data-loading="true"] {
    cursor: default;
  }

  &:not([data-loading="true"]):disabled {
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

export const StyledButtonPrefix = styled.div`
  margin-right: 8px;
  align-items: center;
  display: inline-flex;
`;

export const StyledButtonSuffix = styled.div`
  margin-left: 8px;
  align-items: center;
  display: inline-flex;
`;

export default StyledButton;
