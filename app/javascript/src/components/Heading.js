import styled from 'styled-components';
import { withSpacing } from "./Spacing";

const sizes = {
  s: '19px',
  m: '21px',
  l: '30px',
}

const lineHeighs = {
  s: '24px',
  m: '22px',
  l: '34px'
}

const weights = {
  s: 500,
  m: 600,
  l: 'bold',
}

const letterSpacing = {
  m: '-0.035em',
  l: '-0.035em',
}

export default withSpacing(styled.h3`
  color: #1E1A48;
  font-size: ${props => sizes[props.size] || sizes['m']};
  font-weight: ${props => weights[props.size] || weights['m']};;
  line-height: ${props => lineHeighs[props.size] || lineHeighs['m']};
  letter-spacing: ${props => letterSpacing[props.size] || letterSpacing['m']};
`)
