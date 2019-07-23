import styled from "styled-components";
import { space, color } from "styled-system";

export const Icon = styled.span`
  ${space}
  ${color}
  display: inline-flex;

  svg {
    margin: 0 auto;
    display: inline-block;
  }
`;

export default Icon;
