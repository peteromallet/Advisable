import styled from "styled-components";
import { margin } from "styled-system";

export const StyledBackButton = styled.div`
  ${margin};

  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  background: #f5f5f8;
  display: inline-flex;

  a {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;
