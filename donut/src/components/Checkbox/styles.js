import { darken } from "polished";
import styled from "styled-components";
import { space, variant } from "styled-system";
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
  flex-shrink: 0;
  position: relative;
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.neutral100};
  border: 2px solid ${theme.colors.neutral300};
  transition: background 200ms;

  ${variant({
    prop: "size",
    variants: {
      s: {
        width: 16,
        height: 16,
        marginRight: "xs",
      },
      m: {
        width: 18,
        height: 18,
        marginRight: "xs",
      },
    },
  })}

  svg {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;

export const StyledCheckboxToggleCheck = styled.div`
  position: relative;
`;

export const StyledCheckboxContent = styled.div``;

export const StyledCheckboxText = styled.div`
  font-size: 15px;
  line-height: 18px;
  color: ${theme.colors.neutral800};
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
    background: ${theme.colors.neutral100};
  }

  &:hover ${StyledCheckboxInput}:not(:checked) + ${StyledCheckboxToggle} {
    background: ${darken(0.015, theme.colors.neutral100)};
    border: 2px solid ${darken(0.025, theme.colors.neutral300)};
  }

  ${StyledCheckboxInput}:checked + ${StyledCheckboxToggle} {
    background: ${theme.colors.blue400};
    border-color: ${theme.colors.blue500};
  }

  &:hover ${StyledCheckboxInput}:checked + ${StyledCheckboxToggle} {
    background: ${theme.colors.blue400};
    border-color: ${theme.colors.blue800};
  }
`;

export default StyledCheckbox;
