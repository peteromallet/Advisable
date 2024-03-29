import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0) }
  to { transform: rotate(359deg) }
`;

export const Loading = styled.div`
  width: 100%;
  display: flex;
  padding: 100px 0;
  align-items: center;
  justify-content: center;

  img {
    animation: ${spin} 600ms linear infinite;
  }
`;
