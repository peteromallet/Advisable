// This component is used to render a loading indicator
import { border, space, layout } from "styled-system";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    opacity: 0.05;
  }

  to {
    opacity: 0.1;
  }
`;

export const SkeletonStyles = styled.div`
  border-radius: 8px;
  background: #3c466a;
  animation: ${animation} 0.6s linear infinite alternate;

  ${space}
  ${layout}
  ${border}
`;

export default SkeletonStyles;
