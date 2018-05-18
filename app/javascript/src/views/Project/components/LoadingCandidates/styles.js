import styled, { keyframes } from 'styled-components';

const load = keyframes`
  0% { opacity: 1 }
  50% { opacity: 0.4 }
  99% { opacity: 1 }
`;

export const Title = styled.div`
  height: 25px;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #D9E4F3;
  animation: ${load} 2s linear infinite;
`
