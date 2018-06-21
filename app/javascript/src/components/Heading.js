import styled from 'styled-components';

const sizes = {
  m: '24px',
  l: '32px',
}

const lineHeighs = {
  m: '28px',
}

const weights = {
  m: 600,
  l: 'bold',
}

export default styled.h3`
  color: #061833;
  font-size: ${props => sizes[props.size] || sizes['m']};
  font-weight: ${props => weights[props.size] || weights['m']};;
  line-height: ${props => lineHeighs[props.size] || lineHeighs['m']};
  letter-spacing: -0.05em;
`
