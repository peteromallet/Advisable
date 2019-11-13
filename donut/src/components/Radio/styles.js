import { darken } from "polished";
import styled, { css } from "styled-components";
import theme from "../../theme";

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
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  position: relative;
  border-radius: 50%;
  box-sizing: border-box;
  background: ${theme.colors.neutral[0]};
  border: 2px solid ${theme.colors.neutral[3]};
  transition: background 200ms;

  &::before {
    top: 50%;
    left: 50%;
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 50%;
    background: ${theme.colors.blue[4]};
    transform: translate(-50%, -50%) scale(0);
    transition: transform 200ms;
  }
`;

export const StyledRadioContent = styled.div`
  padding-left: 8px;
`;

export const StyledRadioLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  color: ${theme.colors.neutral[7]};
`;

export const StyledRadioDescription = styled.div`
  font-size: 15px;
  line-height: 18px;
  color: ${theme.colors.neutral[6]};
`;

const disabledStyles = css`
  cursor: default;

  ${StyledRadioToggle}, ${StyledRadioLabel}, ${StyledRadioDescription} {
    opacity: 0.5;
  }
`;

const notDisabledStyles = css`
  cursor: pointer;

  &:hover ${StyledRadioInput}:not(:checked) + ${StyledRadioToggle} {
    background: ${darken(0.015, theme.colors.neutral[0])};
    border: 2px solid ${darken(0.025, theme.colors.neutral[3])};
  }

  ${StyledRadioInput}:checked + ${StyledRadioToggle} {
    border-color: ${theme.colors.blue[5]};

    &:before {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &:hover ${StyledRadioInput}:checked + ${StyledRadioToggle} {
    border-color: ${theme.colors.blue[6]};
  }
`;

export const StyledRadio = styled.label`
  display: flex;
  user-select: none;
  align-items: center;

  ${props => (props.disabled ? disabledStyles : notDisabledStyles)};
`;

export default StyledRadio;
