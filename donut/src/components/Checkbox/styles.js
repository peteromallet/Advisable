import { darken } from "polished";
import styled from "styled-components";
import { space } from "styled-system";
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
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  position: relative;
  border-radius: 6px;
  box-sizing: border-box;
  background: ${theme.colors.neutral[0]};
  border: 2px solid ${theme.colors.neutral[3]};
  transition: background 200ms;

  svg {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;

export const StyledCheckboxContent = styled.div`
  padding-left: 12px;
`;

export const StyledCheckboxText = styled.div`
  font-size: 15px;
  line-height: 18px;
  color: ${theme.colors.neutral[8]};
`;

export const StyledCheckboxInner = styled.div`
  padding: 8px;
  margin: -8px;
  border-radius: 12px;
  align-items: center;
  display: inline-flex;
  transition: background-color 200ms;
`;

export const StyledCheckbox = styled.label`
  ${space};
  display: block;
  cursor: pointer;
  user-select: none;

  &:hover ${StyledCheckboxInner} {
    background: ${theme.colors.neutral[0]};
  }

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
