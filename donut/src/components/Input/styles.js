import theme from "../../theme";
import { variant, margin } from "styled-system";
import { rgba, lighten } from "polished";
import styled, { css } from "styled-components";

export const BORDER_RADIUS = 8;

export const StyledInputDecoration = styled.div`
  display: flex;
  font-size: 16px;
  user-select: none;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${theme.colors.neutral900};
  font-family: system-ui, TTHoves, sans-serif;

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2px;
  }

  &:first-child {
    border-top-left-radius: ${BORDER_RADIUS}px;
    border-bottom-left-radius: ${BORDER_RADIUS}px;
  }

  &:last-child {
    border-top-right-radius: ${BORDER_RADIUS}px;
    border-bottom-right-radius: ${BORDER_RADIUS}px;
  }
`;

export const StyledInputControl = styled.input`
  flex: 1;
  height: 100%;
  border: 2px solid transparent;
  transition: border-color 200ms;
  margin: 0;
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  background: transparent;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 0px;
  color: ${theme.colors.neutral900};
  font-family: TTHoves, sans-serif;

  &::placeholder {
    color: ${theme.colors.neutral400};
  }

  &:first-child {
    border-top-left-radius: ${BORDER_RADIUS}px;
    border-bottom-left-radius: ${BORDER_RADIUS}px;
  }

  &:last-child {
    border-top-right-radius: ${BORDER_RADIUS}px;
    border-bottom-right-radius: ${BORDER_RADIUS}px;
  }
`;

const StyledInput_Error = css`
  border-color: ${theme.colors.red300};
  background-color: ${theme.colors.red50};

  ${StyledInputDecoration} {
    color: ${theme.colors.neutral900};
  }

  ${StyledInputControl}::placeholder {
    color: ${rgba(theme.colors.neutral900, 0.32)};
  }
`;

const StyledInput_Disabled = css`
  opacity: 0.8;
  cursor: not-allowed;

  ${StyledInputControl} {
    cursor: not-allowed;
    color: ${theme.colors.neutral600};

    &::placeholder {
      color: ${lighten(0.12, theme.colors.neutral400)};
    }
  }

  ${StyledInputDecoration} {
    color: ${theme.colors.neutral600};
  }
`;

const size = variant({
  prop: "size",
  variants: {
    sm: {
      height: 40,
      [StyledInputControl]: {
        paddingLeft: 3,
        paddingRight: 3,
      },
      [StyledInputDecoration]: {
        "&:first-child": {
          paddingLeft: 3,
        },
        "&:last-child": {
          paddingRight: 3,
        },
      },
    },
    md: {
      height: 48,
      [StyledInputControl]: {
        paddingLeft: 4,
        paddingRight: 4,
      },
      [StyledInputDecoration]: {
        "&:first-child": {
          paddingLeft: 4,
        },
        "&:last-child": {
          paddingRight: 4,
        },
      },
    },
    lg: {
      height: 56,
      fontSize: 18,
      [StyledInputControl]: {
        paddingLeft: 5,
        paddingRight: 5,
      },
      [StyledInputDecoration]: {
        fontSize: "17px",
        "&:first-child": {
          paddingLeft: 5,
        },
        "&:last-child": {
          paddingRight: 5,
        },
      },
    },
  },
});

const inputColor = variant({
  prop: "inputColor",
  variants: {
    white: {
      background: "white",
      boxShadow: `0 4px 8px -4px ${rgba(theme.colors.neutral900, 0.2)}`,

      "&[data-focused='true']": {
        background: "white",
        borderColor: "blue900",
      },

      [`${StyledInputControl}::placeholder`]: {
        color: "neutral500",
      },
    },
    gray: {
      background: "#eff0f3",

      "&[data-focused='true']": {
        background: "#eff0f3",
        borderColor: "blue900",
      },
    },
  },
});

export const StyledInput = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: ${BORDER_RADIUS}px;
  ${(props) => props.$error && StyledInput_Error};
  ${(props) => props.$disabled && StyledInput_Disabled};

  ${inputColor};
  ${size};
  ${margin};
`;
