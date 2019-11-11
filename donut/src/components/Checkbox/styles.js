import { darken } from "polished";
import styled from "styled-components";
import theme from "../../theme";

export const StyledCheckboxInput = styled.input`
  clip: rect(0px, 0px, 0px, 0px);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  border-width: 0px;
  position: absolute;
  white-space: nowrap;
  border-style: initial;
  border-color: initial;
  border-image: initial;
`;

export const StyledCheckboxToggle = styled.div`
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  border-radius: 6px;
  align-items: center;
  display: inline-flex;
  box-sizing: border-box;
  justify-content: center;
  background: ${theme.colors.neutral[0]};
  border: 2px solid ${theme.colors.neutral[3]};
  transition: background 200ms;
`;

export const StyledCheckboxContent = styled.div``;

export const StyledCheckboxText = styled.p`
  font-size: 14px;
  line-height: 16px;
  padding-left: 12px;
  color: ${theme.colors.neutral[8]};
`;

export const StyledCheckbox = styled.label`
  cursor: pointer;
  align-items: center;
  display: inline-flex;

  &:hover ${StyledCheckboxInput}:not(:checked) + ${StyledCheckboxToggle} {
    background: ${darken(0.015, theme.colors.neutral[0])};
    border: 2px solid ${darken(0.025, theme.colors.neutral[3])};
  }

  ${StyledCheckboxInput}:checked + ${StyledCheckboxToggle} {
    background: ${theme.colors.blue[4]};
    border-color: ${theme.colors.blue[5]};
  }

  &:hover ${StyledCheckboxInput}:checked + ${StyledCheckboxToggle} {
    background: ${theme.colors.blue[4]};
    border-color: ${theme.colors.blue[8]};
  }
`;

export default StyledCheckbox;
