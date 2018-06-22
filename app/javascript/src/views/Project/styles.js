import styled, { keyframes } from 'styled-components';
import Heading from "src/components/Heading";

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 700px;
  padding: 50px 0;
`
