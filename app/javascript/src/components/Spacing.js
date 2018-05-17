import styled from 'styled-components';

const sizes = {
  xs: 5,
  s: 10,
  m: 15,
  l: 20,
  xl: 30,
}

export default styled.div`
  padding-top: ${props => sizes[props.top]}px;
  padding-right: ${props => sizes[props.right]}px;
  padding-bottom: ${props => sizes[props.bottom]}px;
  padding-left: ${props => sizes[props.left]}px;
  display: ${props => props.inline ? 'inline-block' : 'block'};
`
