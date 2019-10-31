import styled, { keyframes } from "styled-components";

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const delay = props => props.delay || "0s";
const duration = props => props.duration || "300ms";
const easing = props => props.easing || "ease-out";

export const SlideInUp = styled.div`
  opacity: 0;
  animation: ${slideInUp} ${duration} ${easing} ${delay} forwards;
`;
