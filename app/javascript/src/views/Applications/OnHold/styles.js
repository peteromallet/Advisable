import styled, { keyframes } from "styled-components";

const scale = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(2); opacity: 0; }
`;

export const Beacon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  position: relative;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin: 30px auto 50px auto;
  box-shadow: 0px 2px 4px rgba(0, 16, 71, 0.16);
  background: linear-gradient(180deg, #2589ff 0%, #2562ff 100%),
    linear-gradient(180deg, #a6efff 0%, #a6efff 2.08%, #8ce4f8 100%);

  &::before,
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    border-radius: 50%;
    transform: scale(1);
    background: rgba(37, 85, 255, 0.1);
    border: 1px solid rgba(37, 85, 255, 0.12);
  }

  &::before {
    animation: ${scale} 4s infinite cubic-bezier(0.4, 0, 0, 1.1);
  }

  &::after {
    animation: ${scale} 4s 1s infinite cubic-bezier(0.4, 0, 0, 1.1);
  }
`;
