import styled from "styled-components";

export default styled.div.attrs(props => ({
  style: {
    width: props.width || "100px",
    height: props.height || "20px",
  },
}))`
  margin-right: 6px;
  background: #d8dce9;
  border-radius: 30px;
  display: inline-block;
`;
