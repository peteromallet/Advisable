import styled, { keyframes } from "styled-components";

const load = keyframes`
  0% { opacity: 1 }
  50% { opacity: 0.4 }
  99% { opacity: 1 }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const Nav = styled.nav`
  width: 100%;
`;

export const LoadingItem = styled.div`
  width: 100%;
  height: 36px;
  border-radius: 4px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.15);
  animation: ${load} 2s linear infinite;
`;

export const Count = styled.div`
  top: 50%;
  right: 10px;
  height: 20px;
  color: #9dc4ef;
  padding: 0 15px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  position: absolute;
  border-radius: 10px;
  transform: translateY(-50%);
  background: rgba(1,34,86,0.15);
`;

export const StatusList = styled.div`
  a {
    opacity: 0;
    width: 100%;
    height: 36px;
    color: #A8CAFF;
    display: flex;
    font-size: 15px;
    padding: 0 10px;
    font-weight: 500;
    position: relative;
    border-radius: 8px;
    padding-left: 40px;
    margin-bottom: 10px;
    align-items: center;
    text-decoration: none;
    letter-spacing: -0.005em;
    animation: ${fadeIn} 300ms forwards;

    &:nth-child(2) { animation-delay: 50ms }
    &:nth-child(3) { animation-delay: 100ms }
    &:nth-child(3) { animation-delay: 150ms }
    &:nth-child(4) { animation-delay: 200ms }

    .Icon {
      top: 50%;
      left: 8px;
      color: #5F9EFF;
      position: absolute;
      transform: translateY(-50%);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }

    &.active {
      color: white;
      background-color: #3081FF;

      .Icon { color: white }

      ${Count} {
        color: white;
        background: rgba(1,34,86,0.25);
      }
    }
  }
`;
