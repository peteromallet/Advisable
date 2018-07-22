import styled from 'styled-components';

const sizes = {
  xs: '5px',
  s: '10px',
  m: '15px',
  l: '20px',
  xl: '30px',
  xxl: '50px',
}

const Spacing = styled.div`
  display: ${props => props.inline ? 'inline-block' : 'block'};
  width: ${props => props.inline ? 'auto' : '100%'};
`

export const withSpacing = Component => Component.extend`
  padding-top: ${props => sizes[props.paddingTop || props.padding || props.top || props.size]};
  padding-right: ${props => sizes[props.paddingRight || props.padding || props.right || props.size]};
  padding-bottom: ${props => sizes[props.paddingBottom || props.padding || props.bottom || props.size]};
  padding-left: ${props => sizes[props.paddingLeft || props.padding || props.left || props.size]};
  margin-top: ${props => sizes[props.marginTop || props.margin]};
  margin-right: ${props => sizes[props.marginRight || props.margin]};
  margin-bottom: ${props => sizes[props.marginBottom || props.margin]};
  margin-left: ${props => sizes[props.marginLeft || props.margin]};
`

export default withSpacing(Spacing);
