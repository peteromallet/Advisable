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
  font-family: system-ui, poppins, sans-serif;
  transition: background-color 200ms, color 200ms;

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
  height: 48px;
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
  font-family: system-ui, poppins, sans-serif;

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

const StyledInput_Focused = css`
  background-color: #eff0f3;
  border-color: ${theme.colors.blue900};
`;

const StyledInput_Disabled = css`
  cursor: not-allowed;
  border-color: ${lighten(0.024, "#eff0f3")};

  ${StyledInputControl} {
    cursor: not-allowed;
    color: ${theme.colors.neutral600};
    background-color: ${lighten(0.024, "#eff0f3")};

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
        paddingLeft: "12px",
        paddingRight: "12px",
      },
      [StyledInputDecoration]: {
        "&:first-child": {
          paddingLeft: "12px",
        },
        "&:last-child": {
          paddingRight: "12px",
        },
      },
    },
    md: {
      height: 48,
      [StyledInputControl]: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
      [StyledInputDecoration]: {
        "&:first-child": {
          paddingLeft: "16px",
        },
        "&:last-child": {
          paddingRight: "16px",
        },
      },
    },
    lg: {
      height: 56,
      fontSize: 18,
      [StyledInputControl]: {
        paddingLeft: 20,
        paddingRight: 20,
      },
      [StyledInputDecoration]: {
        fontSize: "17px",
        "&:first-child": {
          paddingLeft: "20px",
        },
        "&:last-child": {
          paddingRight: "20px",
        },
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
  background: #eff0f3;
  ${(props) => props.$error && StyledInput_Error};
  ${(props) => props.$focused && StyledInput_Focused};
  ${(props) => props.$disabled && StyledInput_Disabled};

  ${size}
  ${margin};
`;
