import { rgba } from "polished";
import styled, { css } from "styled-components";
import MaskedInput from "react-text-mask";
import { withSpacing } from "src/components/Spacing";
import { theme } from "@advisable/donut";

export let Wrapper = styled.div`
  position: relative;
  width: ${props => (props.block ? "100%" : "auto")};
`;

Wrapper = withSpacing(Wrapper);

const fontSizes = {
  default: "16px",
  s: "14px",
};

const heights = {
  default: "36px",
  s: "30px",
};

export const InputBackdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  position: absolute;
  border-radius: 8px;
  transition: border-color 200ms;
  background: ${theme.colors.neutral[1]};
`;

export const Input = styled.input`
  padding: 0;
  width: 100%;
  z-index: 2;
  border: none;
  outline: none;
  box-shadow: none;
  appearance: none;
  font-weight: 500;
  background: transparent;
  font-family: poppins, sans-serif;
  height: ${props => heights[props.size || "default"]};
  font-size: ${props => fontSizes[props.size || "default"]};

  &::-webkit-inner-spin-button {
    opacity: 0;
    -webkit-appearance: none;
  }

  &::-webkit-input-placeholder {
    color: #acaec1;
  }
  &::-moz-placeholder {
    color: #acaec1;
  }
  &:-ms-input-placeholder {
    color: #acaec1;
  }
  &:-moz-placeholder {
    color: #acaec1;
  }

  &:focus + ${InputBackdrop} {
    border: 2px solid ${rgba("#173fcd", 0.9)} !important;
  }
`;

export const Prefix = styled.div`
  z-index: 20;
  color: #5e6784;
  font-weight: 500;
  padding-right: 6px;
  line-height: ${props => heights[props.size || "default"]};
  height: ${props => heights[props.size || "default"]};
  font-size: ${props => fontSizes[props.size || "default"]};
`;

const focusedStyles = css`
  border-color: ${theme.colors.blue[5]};

  &:hover {
    border-color: ${theme.colors.blue[5]};
  }
`;

export const InputContainer = styled.div`
  display: flex;
  cursor: text;
  padding: 0 12px;
  border-radius: 8px;
  position: relative;
  align-items: center;
  border: 2px solid transparent;
  background: ${theme.colors.neutral[1]};

  &:hover {
    border-color: ${theme.colors.neutral[2]};
  }

  ${props => props.isFocused && focusedStyles}
`;

export const CharCount = styled.span`
  left: 14px;
  z-index: 20;
  bottom: 15px;
  position: absolute;
  color: #6e7796;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

export const InputMask = Input.withComponent(MaskedInput);

export let Textarea = Input.withComponent("textarea");

Textarea = styled(Textarea)`
  resize: none;
  height: auto;
  padding: 10px 0;
  overflow: auto;
  line-height: 18px;
  font-family: poppins, sans-serif;
`;
