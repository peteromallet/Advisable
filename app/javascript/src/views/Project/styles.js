import styled, { keyframes } from 'styled-components';

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

export const Title = styled.h1`
  color: #161336;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: -0.05em;
  animation: ${slideUp} 700ms cubic-bezier(0.3, 0, 0, 1);
`

export const Count = styled.h1`
  color: #8798B3;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
  letter-spacing: -0.04em;
  opacity: 0;
  animation: ${slideUp} 700ms cubic-bezier(0.3, 0, 0, 1) forwards;
`
