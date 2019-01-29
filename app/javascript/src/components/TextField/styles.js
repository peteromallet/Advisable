import styled from 'styled-components';
import MaskedInput from 'react-text-mask'
import { withSpacing } from 'src/components/Spacing';

export let Wrapper = styled.div`
  width: ${props => props.block ? "100%" : "auto"};
`

Wrapper = withSpacing(Wrapper)

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
    background: #ECF1FA;
    border-color: #3360FF;
  }

  &::-webkit-inner-spin-button {
    opacity: 0;
    -webkit-appearance: none;
  }

  &::-webkit-input-placeholder {
    color: #8C92AE;
  }
  &::-moz-placeholder {
    color: #8C92AE;
  }
  &:-ms-input-placeholder {
    color: #8C92AE;
  }
  &:-moz-placeholder {
    color: #8C92AE;
  }
`

export const InputMask = Input.withComponent(MaskedInput);

export let Textarea = Input.withComponent("textarea")
Textarea = styled(Textarea)`
  resize: none;
  height: auto;
  padding: 10px;
  overflow: auto;
  line-height: 18px;
`
