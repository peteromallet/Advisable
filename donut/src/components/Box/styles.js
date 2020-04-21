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
  background,
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
  ${background}
`;

export default Box;
