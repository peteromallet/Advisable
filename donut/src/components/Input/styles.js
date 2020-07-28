import theme from "../../theme";
import { variant, margin } from "styled-system";
import { rgba, darken, lighten } from "polished";
import styled, { css } from "styled-components";

export const StyledInputDecoration = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  padding-top: 1px;
  padding-bottom: 1px;
  justify-content: center;
  color: ${theme.colors.blue900};
  font-family: system-ui, poppins, sans-serif;
  background-color: ${darken(0.05, "#eff0f3")};
  transition: background-color 200ms, color 200ms;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2px;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const StyledInputControl = styled.input`
  width: 100%;
  border: none;
  height: 48px;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  background: transparent;
  padding-top: 1px;
  padding-bottom: 1px;
  border-radius: 0px;
  color: ${theme.colors.neutra900};
  font-family: system-ui, poppins, sans-serif;
  border: 2px solid transparent;
  transition: border-color 200ms;

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &::placeholder {
    color: ${theme.colors.neutral400};
  }
`;

const StyledInput_Error = css`
  ${StyledInputControl} {
    border-color: ${theme.colors.red300};
    background-color: ${theme.colors.red50};
  }

  ${StyledInputDecoration} {
    color: ${theme.colors.neutral900};
    background-color: ${theme.colors.red300};
  }

  ${StyledInputControl}::placeholder {
    color: ${rgba(theme.colors.neutral900, 0.32)};
  }
`;

const StyledInput_Focused = css`
  ${StyledInputControl} {
    background-color: #eff0f3;
    border-color: ${theme.colors.blue900};
  }

  ${StyledInputDecoration} {
    color: white;
    background-color: ${theme.colors.blue900};
  }
`;

const StyledInput_Disabled = css`
  cursor: not-allowed;

  ${StyledInputControl} {
    cursor: not-allowed;
    border-color: transparent;
    color: ${theme.colors.neutral600};
    background-color: ${lighten(0.024, "#eff0f3")};

    &::placeholder {
      color: ${lighten(0.12, theme.colors.neutral400)};
    }
  }

  ${StyledInputDecoration} {
    background-color: #eff0f3;
    color: ${theme.colors.neutral600};
  }
`;

const size = variant({
  prop: "size",
  variants: {
    sm: {
      [StyledInputControl]: {
        height: 40,
        paddingLeft: "12px",
        paddingRight: "12px",
      },
      [StyledInputDecoration]: {
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
    md: {
      [StyledInputControl]: {
        height: 48,
        paddingLeft: "16px",
        paddingRight: "16px",
      },
      [StyledInputDecoration]: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    lg: {
      [StyledInputControl]: {
        height: 56,
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20,
      },
      [StyledInputDecoration]: {
        fontSize: "17px",
        paddingLeft: "20px",
        paddingRight: "20px",
      },
    },
  },
});

export const StyledInput = styled.div`
  display: flex;
  border-radius: 8px;
  background: #eff0f3;
  ${(props) => props.$error && StyledInput_Error};
  ${(props) => props.$focused && StyledInput_Focused};
  ${(props) => props.$disabled && StyledInput_Disabled};

  ${size}
  ${margin};
`;
