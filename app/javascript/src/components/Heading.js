import styled from 'styled-components';
import { withSpacing } from "./Spacing";

const sizes = {
  xxs: "13px",
  s: '19px',
  m: '21px',
  l: '30px',
}

const textTransform = {
  xxs: "uppercase",
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
  semibold: 600,
  xxs: 500,
}

const colours = {
  xxs: "#757FA4",
  default: "#1E1A48",
}

const letterSpacing = {
  m: '-0.035em',
  l: '-0.035em',
  xxs: "",
}

export default withSpacing(styled.h3`
  color: ${props => colours[props.size || "default"]};
  font-size: ${props => sizes[props.size] || sizes['m']};
  font-weight: ${props => weights[props.weight || props.size] || weights['m']};;
  line-height: ${props => lineHeighs[props.size] || lineHeighs['m']};
  letter-spacing: ${props => letterSpacing[props.size] || letterSpacing['m']};
  display: ${props => props.block ? 'block' : 'auto'};
  text-align: ${props => props.center ? 'center' : 'inherit'};
  text-transform: ${props => textTransform[props.size]};
`)
