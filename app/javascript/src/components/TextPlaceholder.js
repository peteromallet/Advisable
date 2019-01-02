import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    width: props.width || "100px",
    height: props.height || "20px"
  })
})`
  margin-right: 6px;
  background: #D8DCE9;
  border-radius: 30px;
  display: inline-block;
`