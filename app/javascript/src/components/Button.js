import styled from 'styled-components';

const heights = {
  m: '34px',
  l: '40px'
}

const fontSizes = {
  m: '15px',
  l: '16px',
}

const Button = styled.button`
  height: ${props => heights[props.size] || heights['m']}
  color: white;
  border: none;
  outline: none;
  font-size: ${props => fontSizes[props.size] || fontSizes['m']};
  padding: 0 20px;
  cursor: pointer;
  font-weight: 600;
  border-radius: 8px;
  background: #4C496A;
  letter-spacing: -0.05em;
  -webkit-appearance: none;
  width: ${props => props.block ? '100%' : 'auto'};
  display: ${props => props.block ? 'block' : 'inline-block'};
  transition: box-shadow 0.2s, background 0.2s;

  &:hover {
    background: #373453;
  }

  &:active {
    background: #161526;
    transition: none;
  }

  ${props => props.primary && `
    background: #0076F7;

    &:hover {
      background: #238BFF;
    }

    &:active {
      background: #0066D6;
      transition: none;
    }
  `}
`

export default Button;
