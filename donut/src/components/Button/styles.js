import { space } from "styled-system";
import styled, { keyframes, css } from "styled-components";
import { darken, lighten, rgba } from "polished";
import colors from "../../colors";
import theme from "../../theme";

const HEIGHTS = {
  xs: 28,
  s: 32,
  m: 36,
  l: 46,
};

const PADDING = {
  xs: "0 12px",
  s: "0 14px",
  m: "0 16px",
  l: "0 24px",
};

const BORDER_RADIUS = {
  xs: "7px",
  s: "8px",
  m: "10px",
};

const FONT_SIZES = {
  xs: 12,
  s: 14,
  m: 14,
  l: 16,
};

const APPEARANCES = {
  default: css`
    line-height: 1;
    color: ${theme.colors.neutral[7]};
    background: ${theme.colors.neutral[1]};
    padding: ${props => PADDING[props.size || "m"]};
    height: ${props => HEIGHTS[props.size || "m"]}px;

    &:hover:not(:disabled) {
      color: ${theme.colors.neutral[8]};
      background: ${theme.colors.neutral[2]};
    }

    &:active:not(:disabled) {
      opacity: 0.75;
      background: ${theme.colors.neutral[2]};
    }
  `,
  primary: css`
    height: ${props => HEIGHTS[props.size || "m"]}px;
    line-height: 1;
    padding: ${props => PADDING[props.size || "m"]};
    font-weight: 500;
  `,
  minimal: css`
    outline: none;
    font-weight: 500;
    padding: 2px 8px;
    margin-left: -8px;
    background: transparent;
  `,
  outlined: css`
    line-height: 1;
    background: transparent;
    color: ${theme.colors.neutral[7]};
    padding: ${props => PADDING[props.size || "m"]};
    height: ${props => HEIGHTS[props.size || "m"]}px;
    border: 1px solid ${theme.colors.neutral[2]};

    &:hover {
      border-color: ${theme.colors.neutral[3]};
    }
  `,
};

const INTENT = {
  default: {
    default: css``,
    success: css`
      color: ${colors.blue.N6};

      &:hover:not(:disabled) {
        color: ${colors.blue.N7};
      }

      &:active:not(:disabled) {
        color: ${colors.blue.N4};
      }
    `,
  },
  primary: {
    default: css`
      color: white;
      background: ${theme.colors.neutral[7]};

      &:hover:not(:disabled) {
        background: ${theme.colors.neutral[8]};
      }

      &:active:not(:disabled) {
        opacity: 0.8;
      }
    `,
    success: css`
      color: white;
      background: ${theme.colors.blue[5]};

      &:hover:not(:disabled):not([data-loading]) {
        background: ${darken(0.1, theme.colors.blue[5])};
      }

      &:active:not(:disabled):not([data-loading]) {
        background: ${darken(0.2, theme.colors.blue[5])};
      }

      &[data-loading] {
        background: ${lighten(0.1, colors.blue.N5)};
      }
    `,
  },
  minimal: {
    success: css`
      color: ${theme.colors.blue[6]};

      &:hover:not(:disabled) {
        color: ${colors.blue.N6};
      }

      &:active:not(:disabled) {
        color: ${colors.blue.N4};
      }
    `,
  },
  outlined: {
    default: css``,
  },
};

const loadingDot = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
`;

export const Loading = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.div`
  opacity: 0;
  width: 5px;
  height: 5px;
  margin: 0 4px;
  background: white;
  border-radius: 50%;
  display: inline-block;
  animation: ${loadingDot} 1s infinite;

  &:nth-child(2) {
    animation-delay: 100ms;
  }
  &:nth-child(3) {
    animation-delay: 200ms;
  }
`;

const disabledStyling = css`
  opacity: 0.5;
  cursor: default;
`;

const loadingStyling = css`
  cursor: default;
  color: transparent !important;
`;

export const Button = styled.button`
  margin: 0;
  border: none;
  font-size: ${props => FONT_SIZES[props.size || "m"]}px;
  cursor: pointer;
  appearance: none;
  font-weight: 500;
  position: relative;
  border-radius: ${props => BORDER_RADIUS[props.size] || "12px"};
  align-items: center;
  display: inline-flex;
  text-decoration: none;
  justify-content: center;
  transition: background 80ms;
  width: ${props => props.width};
  font-family: "Poppins", sans-serif;
  justify-content: ${props => props["data-align"] || "center"};

  &:focus {
    outline: none;
  }

  ${props => APPEARANCES[props.appearance]};
  ${props => INTENT[props.appearance][props.intent]};

  ${props => props.disabled && disabledStyling};
  ${props => props["data-loading"] && loadingStyling};

  ${space}
`;

export const ButtonText = styled.span`
  ${props => props.hasIcon && { paddingLeft: 8 }};
  ${props => props.hasRightIcon && { paddingRight: 8 }};
`;

export default Button;
