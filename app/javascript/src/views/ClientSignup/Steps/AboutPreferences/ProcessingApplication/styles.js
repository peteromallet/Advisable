import { Box } from "@advisable/donut";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    background-color: rgba(255,255,255,0.8);
  }

  to {
    background-color: rgba(255,255,255,0.94);
  }
`;

export const ProcessingApplicationWrapper = styled(Box)`
  border-radius: 4px;
  background: #3c466a;
  animation: ${animation} 1s linear infinite alternate;
`;

export default ProcessingApplicationWrapper;
