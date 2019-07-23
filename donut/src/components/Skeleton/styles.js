// This component is used to render a loading indicator
import { space } from "styled-system";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    opacity: 0.05;
  }

  to {
    opacity: 0.1;
  }
`;

export const SkeletonStyles = styled.div.attrs(props => ({
  style: {
    width: props.width,
    height: props.height,
  },
}))`
  ${space}
  border-radius: 4px;
  background: #3c466a;
  animation: ${animation} 0.6s linear infinite alternate;
`;

export default SkeletonStyles;
