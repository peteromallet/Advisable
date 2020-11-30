import styled, { css } from "styled-components";
import { rgba } from "polished";
import { variant } from "styled-system";
import theme from "../../theme";

export const StyledToggleInput = styled.input`
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
  bottom: 0px;
  width: 100%;
  height: 100%;
  opacity: 0.0001;
  position: absolute;
`;

export const StyledToggleLabel = styled.span`
  top: 0;
  border: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;

  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  height: 1px;
  width: 1px;
`;

export const StyledToggleThumb = styled.div`
  background: white;
  border-radius: 50%;
  transition: transform 200ms;
  box-shadow: 0 1px 2px ${rgba(theme.colors.neutral900, 0.1)};
`;

export const StyledToggleBackground = styled.div`
  padding: 3px;
  display: inline-block;
  transition: background-color 200ms;
  background: ${theme.colors.neutral200};
`;

const size = variant({
  prop: "size",
  variants: {
    md: {
      [StyledToggleThumb]: {
        width: "22px",
        height: "22px",
      },
      [StyledToggleBackground]: {
        height: "28px",
        width: "50px",
        borderRadius: "14px",
      },
    },
  },
});

export const StyledToggle_Disabled = css`
  opacity: 0.4;
`;

export const StyledToggle_Checked = css`
  ${StyledToggleThumb} {
    transform: translateX(100%);
  }

  ${StyledToggleBackground} {
    background: ${theme.colors.blue400};
  }

  &:not([data-disabled="true"]):hover ${StyledToggleBackground} {
    background: ${theme.colors.blue500};
  }
`;

export const StyledToggle = styled.label`
  ${size};
  user-select: none;
  position: relative;
  display: inline-block;

  &:not([data-disabled="true"]):hover ${StyledToggleBackground} {
    background: ${theme.colors.neutral300};
  }

  ${(p) => p.$checked && StyledToggle_Checked};
  ${(p) => p.$disabled && StyledToggle_Disabled};
`;
