import { rgba } from "polished";
import styled, { css, keyframes } from "styled-components";
import { margin, layout, variant } from "styled-system";

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
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: ${spin} 700ms linear infinite;
  transform: translate(-50%, -50%) rotate(0deg);
`;

const primaryStyles = css`
  background: #3f3cff;

  &:not(:disabled):hover {
    background: #5d59ff;
  }

  &:not(:disabled):active {
    background: #3330d3;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const secondaryStyles = css`
  background: #020e55;

  &:not(:disabled):hover {
    background: #27306a;
  }

  &:not(:disabled):active {
    background: #000833;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &[disabled]:not([data-loading="true"]) {
    opacity: 0.4;
  }
`;

const VARIANTS = {
  primary: primaryStyles,
  secondary: secondaryStyles,
  dark: secondaryStyles, // deprecated: use secondary variant instead
  green: primaryStyles, // deprecated: use primary variant instead
  subtle: css`
    color: #242473;
    background: #e8e8f6;

    &:not(:disabled):hover {
      background: #ededf8;
    }

    &:not(:disabled):active {
      background: #e4e4f4;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.025);
    }

    ${Loading} {
      color: #242473;
    }
  `,
  ghost: css`
    color: #3f3bff;

    &:not(:disabled):hover {
      background: ${rgba("#3f3bff", 0.04)};
    }

    &:not(:disabled):active {
      background: ${rgba("#3f3bff", 0.08)};
    }

    ${Loading} {
      color: #3f3bff;
    }

    &[data-loading="true"] {
      background: ${rgba("#3f3bff", 0.04)};
    }
  `,
};

const buttonSize = variant({
  prop: "buttonSize",
  variants: {
    s: {
      height: 35,
      fontSize: 15,
      fontWeight: 600,
      paddingLeft: 18,
      paddingRight: 18,
      svg: {
        width: 16,
        height: 16,
      },
    },
    m: {
      height: 42,
      fontSize: 16,
      fontWeight: 600,
      paddingLeft: 24,
      paddingRight: 24,
      svg: {
        width: 20,
        height: 20,
      },
    },
    l: {
      height: 50,
      fontSize: 17,
      fontWeight: 600,
      paddingLeft: 28,
      paddingRight: 28,
      svg: {
        width: 24,
        height: 24,
      },
    },
  },
});

export const StyledButton = styled.button`
  ${margin}
  ${layout}
  ${buttonSize}

  border: none;
  color: white;
  outline: none;
  line-height: 1;
  padding-top: 0;
  padding-bottom: 0;
  appearance: none;
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
  letter-spacing: -0.02em;
  background: transparent;
  transition: background 100ms;
  ${(props) => props.align === "left" && { justifyContent: "flex-start" }}

  svg {
    stroke-width: 2;
  }

  &[data-loading="true"] {
    cursor: default;
    color: transparent;
  }

  &[disabled]:not([data-loading="true"]) {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) => VARIANTS[props.variant || "primary"]}
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
