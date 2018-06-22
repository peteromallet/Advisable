import styled from 'styled-components';

const heights = {
  m: '34px',
  l: '38px'
}

const fontSizes = {
  m: '16px',
  l: '17px',
}

const Button = styled.button`
  height: ${props => heights[props.size] || heights['m']}
  color: white;
  border: none;
  outline: none;
  font-size: ${props => fontSizes[props.size] || fontSizes['m']};
  padding: 0 25px;
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
    box-shadow: 0 2px 4px 0 rgba(24,71,180,0.10);

    &:hover {
      background: #3270FF;
    }

    &:active {
      background: #0C4EE4;
      transition: none;
    }
  `}
`

export default Button;
