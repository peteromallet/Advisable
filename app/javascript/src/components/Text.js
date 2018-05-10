import styled from 'styled-components';

const weights = {
  strong: 600,
}

const colours = {
  strong: "#1B2A3A",
}

export default styled.p`
  font-size: 16px;
  line-height: 23px;
  font-weight: ${props => weights[props.variation] || 400};
  color: ${props => colours[props.variation] || '#576471'};
`
