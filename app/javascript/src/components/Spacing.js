import styled from 'styled-components';

const sizes = {
  xs: 5,
  s: 10,
  m: 15,
  l: 20,
  xl: 30,
}

export default styled.div`
  padding-top: ${props => sizes[props.top || props.size]}px;
  padding-right: ${props => sizes[props.right || props.size]}px;
  padding-bottom: ${props => sizes[props.bottom || props.size]}px;
  padding-left: ${props => sizes[props.left || props.size]}px;
  display: ${props => props.inline ? 'inline-block' : 'block'};
  width: ${props => props.inline ? 'auto' : '100%'};
`
