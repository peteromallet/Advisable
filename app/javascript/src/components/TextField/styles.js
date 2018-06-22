import styled from 'styled-components';
import MaskedInput from 'react-text-mask'

export const Wrapper = styled.div`

`

export const Input = styled(MaskedInput)`
  max-width: 100%;
  height: 36px;
  border: none;
  outline: none;
  padding: 0 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: #F4F7FC;
  letter-spacing: -0.03em;
  transition: background 300ms;

  &::-webkit-inner-spin-button {
    opacity: 0;
    -webkit-appearance: none;
  }

  &:focus {
    background: #ECF1FA;
  }

  &::-webkit-input-placeholder {
    color: #a4add1;
  }
  &::-moz-placeholder {
    color: #a4add1;
  }
  &:-ms-input-placeholder {
    color: #a4add1;
  }
  &:-moz-placeholder {
    color: #a4add1;
  }
`
