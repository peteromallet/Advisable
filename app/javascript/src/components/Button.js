import styled from 'styled-components';

const Button = styled.button`
  height: 34px;
  color: white;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 0 20px;
  cursor: pointer;
  font-weight: 600;
  border-radius: 8px;
  background: #4C496A;
  letter-spacing: -0.04em;
  -webkit-appearance: none;
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
