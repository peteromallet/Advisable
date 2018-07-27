import React from 'react';
import styled, { keyframes } from 'styled-components';
import { withSpacing } from "./Spacing";

const heights = {
  s: '30px',
  m: '34px',
  l: '38px'
}

const fontSizes = {
  s: '12px',
  m: '12px',
  l: '14px',
}

const padding = {
  s: '0 15px',
  m: '0 20px',
  l: '0 25px',
}

export const ButtonStyling = styled.button`
  position: relative;
  margin: 0;
  height: ${props => heights[props.size] || heights['m']}
  color: white;
  border: none;
  outline: none;
  font-size: ${props => fontSizes[props.size] || fontSizes['m']};
  padding: ${props => padding[props.size] || padding['m']};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
  background: #4C496A;
  letter-spacing: -0.02em;
  -webkit-appearance: none;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  width: ${props => props.block ? '100%' : 'auto'};
  display: ${props => props.block ? 'flex' : 'inline-flex'};
  transition: box-shadow 0.2s, background 0.2s;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background: #373453;
  }

  &:active {
    background: #161526;
    transition: none;
  }

  ${props => props.blank && `
    color: #7D8DB0;
    background: white;
    border: 1px solid #E8EDF9;

    &:hover {
      color: #63749A;
      background: white;
      border-color: #C6CFE4;
    }

    &:active {
      color: #3E4B68;
      background: white;
    }
  `}

  ${props => props.primary && `
    background: #1A5FFF;

    &:hover {
      background: #3270FF;
    }

    &:active {
      background: #0C4EE4;
      transition: none;
    }
  `}

  ${props => props.loading && `
    color: transparent !important;
  `}
`

const ButtonLoading = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  position: absolute;
  align-items: center;
  justify-content: center;
`

const loadingDot = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
`

const ButtonLoadingDot = styled.div`
  opacity: 0;
  width: 6px;
  height: 6px;
  margin: 0 4px;
  background: white;
  border-radius: 50%;
  display: inline-block;
  animation: ${loadingDot} 1s infinite;

  &:nth-child(2) { animation-delay: 100ms }
  &:nth-child(3) { animation-delay: 200ms }
`

const Loading = () => (
  <ButtonLoading>
    <ButtonLoadingDot />
    <ButtonLoadingDot />
    <ButtonLoadingDot />
  </ButtonLoading>
)

const ButtonWithSpacing = withSpacing(ButtonStyling)

export default ({ loading, children, ...props }) => (
  <ButtonWithSpacing loading={loading} {...props}>
    {loading && <Loading />}
    {children}
  </ButtonWithSpacing>
);
