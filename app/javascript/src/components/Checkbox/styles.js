import styled from 'styled-components';
import { withSpacing } from 'src/components/Spacing';
import tick from './tick.svg'

export const Wrapper = withSpacing(styled.div``)

export const Label = styled.label`
  color: #00104B;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  padding-left: 28px;
  user-select: none;
`

export const Box = styled.span`
  left: 0;
  width: 18px;
  height: 18px;
  display: block;
  border-radius: 4px;
  position: absolute;
  top: calc(50% - 10px);
  border: 2px solid #B7BDD5;
  transition: border-color 200ms;
`

export const Input = styled.input`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
  clip: rect(1px,1px,1px,1px);

  &:checked + ${Label} ${Box} {
    border-color: #173FCD;
    background: url(${tick}) no-repeat center;
  }

  &:focus + ${Label} ${Box} {
    border-color: #173FCD;
  }
`
