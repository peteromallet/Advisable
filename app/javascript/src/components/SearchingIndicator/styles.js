import styled, { keyframes } from "styled-components";
import { theme } from "@advisable/donut";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  8% {
    transform: scale(1.05);
  }
  16% {
    transform: scale(1);
  }
`;

const rings = keyframes`
  from {
    opacity: 1;
    transform: scale(0.5);
  }

  to {
    opacity: 0;
    transform: scale(1);
  }
`;

const StyledSearchingIndicator = styled.div`
  width: 60px;
  height: 60px;
  color: white;
  display: inline-flex;
  position: relative;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 3s infinite linear;
  background: ${theme.colors.blue500};

  &::before,
  &::after {
    top: -50%;
    left: -50%;
    z-index: -1;
    content: "";
    width: 200%;
    height: 200%;
    display: block;
    position: absolute;
    border-radius: 50%;
    transform: scale(0.5);
    border: 1px solid ${theme.colors.blue500};
  }

  &::before {
    animation: ${rings} 3s infinite;
  }

  &::after {
    animation: ${rings} 3s 0.75s infinite;
  }
`;

export default StyledSearchingIndicator;
