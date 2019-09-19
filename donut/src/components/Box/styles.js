import styled from "styled-components";
import {
  space,
  border,
  layout,
  color,
  flexbox,
  position,
  typography,
} from "styled-system";

const Box = styled.div`
  ${flexbox}
  ${color}
  ${space}
  ${layout}
  ${border}
  ${position}
  ${typography}
`;

export default Box;
