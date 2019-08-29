import { space } from "styled-system";
import styled, { keyframes, css } from "styled-components";
import { darken, lighten, rgba } from "polished";
import colors from "../../colors";
import theme from "../../theme";
import Icon from "../Icon/styles";

const HEIGHTS = {
  m: 36,
  l: 46,
};

const PADDING = {
  m: "0 16px",
  l: "0 24px",
};

const APPEARANCES = {
  default: css`
    height: ${props => HEIGHTS[props.size || "m"]}px;
    line-height: 1;
    padding: ${props => PADDING[props.size || "m"]};
    background: ${rgba(colors.neutral.N2, 0.7)};

    &:hover:not(:disabled) {
      background: ${rgba(colors.neutral.N2, 1)};
    }

    &:active:not(:disabled) {
      background: ${rgba(colors.neutral.N2, 0.6)};
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
  outline: css``,
};

const INTENT = {
  default: {
    default: css`
      color: ${colors.neutral.N6};

      &:hover:not(:disabled) {
        color: ${colors.neutral.N8};
      }

      &:active:not(:disabled) {
        color: ${colors.neutral.N5};
      }
    `,
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
      background: ${colors.neutral.N6};
    `,
    success: css`
      color: white;
      background: ${theme.colors.blue[4]};

      &:hover:not(:disabled):not([data-loading]) {
        background: ${darken(0.1, theme.colors.blue[4])};
      }

      &:active:not(:disabled):not([data-loading]) {
        background: ${darken(0.2, theme.colors.blue[4])};
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
  outline: {
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
  color: transparent;
`;

const FONT_SIZES = {
  m: 15,
  l: 16,
};

export const Button = styled.button`
  margin: 0;
  border: none;
  outline: none;
  font-size: ${props => FONT_SIZES[props.size || "m"]}px;
  cursor: pointer;
  appearance: none;
  font-weight: 400;
  position: relative;
  border-radius: 12px;
  align-items: center;
  display: inline-flex;
  text-decoration: none;
  justify-content: center;
  transition: background 150ms;
  width: ${props => props.width};
  font-family: "Poppins", sans-serif;

  ${space}

  ${props => APPEARANCES[props.appearance]};
  ${props => INTENT[props.appearance][props.intent]};

  ${props => props.isLoading && loadingStyling};
  ${props => props.disabled && disabledStyling};
`;

export default Button;
