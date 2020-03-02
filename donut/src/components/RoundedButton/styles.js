import { lighten, darken } from "polished";
import styled, { css, keyframes } from "styled-components";
import { space, layout, variant } from "styled-system";
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
  dark: css`
    color: white;
    background: ${theme.colors.blue[8]};

    &:not(:disabled):hover {
      color: white;
      background: ${darken(0.02, theme.colors.blue[7])};
    }

    &:not(:disabled):active {
      color: white;
      background: ${lighten(0.02, theme.colors.blue[7])};
    }
  `,
  subtle: css`
    color: ${theme.colors.blue[7]};
    background: ${theme.colors.blue[0]};

    &:not(:disabled):hover {
      color: ${theme.colors.blue[8]};
      background: ${darken(0.02, theme.colors.blue[0])};
    }

    &:not(:disabled):active {
      color: ${theme.colors.blue[8]};
      background: ${lighten(0.005, theme.colors.blue[0])};
    }
  `,
};

const buttonSize = variant({
  prop: "size",
  variants: {
    s: {
      height: 32,
      fontSize: 14,
      paddingLeft: 20,
      paddingRight: 20,
    },
    m: {
      height: 38,
      fontSize: 15,
      paddingLeft: 20,
      paddingRight: 20,
    },
    l: {
      height: 48,
      fontSize: 16,
      paddingLeft: 28,
      paddingRight: 28,
    },
  },
});

export const StyledButton = styled.button`
  ${space}
  ${layout}
  ${buttonSize}

  border: none;
  color: white;
  outline: none;
  line-height: 1;
  appearance: none;
  font-weight: 500;
  user-select: none;
  position: relative;
  border-radius: 30px;
  align-items: center;
  white-space: nowrap;
  display: inline-flex;
  font-family: poppins;
  text-decoration: none;
  vertical-align: middle;
  justify-content: center;
  letter-spacing: -0.01em;
  background: ${theme.colors.blue[5]};
  transition: background 100ms, color 100ms;
  width: ${props => (props.fullWidth ? "100%" : "auto")};
  ${props => props.align === "left" && { justifyContent: "flex-start" }}

  &:focus {
    outline: 2px solid red;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &[data-loading="true"] {
    cursor: default;
    color: transparent;
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
