import styled from 'styled-components';

const weights = {
  strong: 500,
}

const colours = {
  strong: "#1B2A3A",
}

export default styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: ${props => weights[props.variation] || 400};
  color: ${props => colours[props.variation] || '#576471'};
`
