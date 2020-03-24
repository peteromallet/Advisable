import styled from "styled-components";
import {
  grid,
  space,
  border,
  layout,
  color,
  flexbox,
  position,
  typography,
  shadow,
} from "styled-system";

const Box = styled.div`
  ${grid}
  ${flexbox}
  ${color}
  ${space}
  ${layout}
  ${border}
  ${position}
  ${typography}
  ${shadow}
`;

export default Box;
