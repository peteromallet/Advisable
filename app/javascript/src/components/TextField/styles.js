import styled, { css } from "styled-components";
import MaskedInput from "react-text-mask";
import { withSpacing } from "src/components/Spacing";

export let Wrapper = styled.div`
  position: relative;
  width: ${props => (props.block ? "100%" : "auto")};
`;

Wrapper = withSpacing(Wrapper);

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  padding: 0 14px;
  font-size: 16px;
  box-shadow: none;
  appearance: none;
  font-weight: 500;
  border-radius: 8px;
  border: 2px solid transparent;
  background: rgba(29, 39, 75, 0.06);
  transition: border-color 200ms, background-color 300ms;

  &:focus {
    background: #ecf1fa;
    border-color: #3360ff;
  }

  &::-webkit-inner-spin-button {
    opacity: 0;
    -webkit-appearance: none;
  }

  &::-webkit-input-placeholder {
    color: #8c92ae;
  }
  &::-moz-placeholder {
    color: #8c92ae;
  }
  &:-ms-input-placeholder {
    color: #8c92ae;
  }
  &:-moz-placeholder {
    color: #8c92ae;
  }
`;

export const InputContainer = styled.div`
  position: relative;
`

export const CharCount = styled.span`
  left: 14px;
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
  padding: 10px;
  overflow: auto;
  line-height: 18px;
`;
