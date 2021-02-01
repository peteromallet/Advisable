import { darken } from "polished";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

export const StyledRadioInput = styled.input`
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

export const StyledRadioToggle = styled.div`
  top: 50%;
  left: 12px;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  position: absolute;
  border-radius: 6px;
  box-sizing: border-box;
  transform: translateY(-50%);
  background: ${theme.colors.neutral100};
  border: 2px solid ${theme.colors.neutral400};
  transition: background 200ms;

  &::before {
    top: 2px;
    left: 2px;
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 4px;
    box-sizing: border-box;
    background: ${theme.colors.blue400};
    transform: scale(0);
    transition: transform 200ms;
  }
`;

const disabledStyles = css`
  cursor: default;

  ${StyledRadioToggle} {
    opacity: 0.5;
  }
`;

const notDisabledStyles = css`
  cursor: pointer;

  &:hover + ${StyledRadioToggle} {
    background: ${darken(0.015, theme.colors.neutral100)};
    border: 2px solid ${darken(0.025, theme.colors.neutral300)};
  }

  &[data-checked="true"] ${StyledRadioToggle} {
    border-color: ${theme.colors.blue500};

    &:before {
      transform: scale(1);
    }
  }
`;

export const StyledRadio = styled.label`
  padding: 12px;
  display: flex;
  user-select: none;
  border-radius: 8px;
  align-items: center;
  position: relative;
  padding-left: 40px;
  background: ${theme.colors.neutral100};

  ${(props) => (props.disabled ? disabledStyles : notDisabledStyles)};
`;

export default StyledRadio;
