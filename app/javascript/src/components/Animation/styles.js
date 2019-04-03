import styled, { keyframes } from "styled-components";

const Animation = styled.div`
  animation-delay: ${props => props.delay};
  animation-duration: ${props => props.duration};
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const FadeInUp = styled(Animation)`
  opacity: 0;
  animation: ${fadeInUp} 300ms 0s forwards;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const FadeIn = styled(Animation)`
  opacity: 0;
  animation: ${fadeIn} 300ms 0s forwards;
`;
