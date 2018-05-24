import styled, { keyframes } from "styled-components";

const load = keyframes`
  0% { opacity: 1 }
  50% { opacity: 0.4 }
  99% { opacity: 1 }
`;

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
  font-weight: 600;
  line-height: 22px;
  position: absolute;
  border-radius: 10px;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.15);
`;

export const StatusList = styled.div`
  a {
    width: 100%;
    height: 36px;
    color: #b4d3f5;
    display: block;
    line-height: 38px;
    font-size: 16px;
    padding: 0 10px;
    font-weight: 600;
    position: relative;
    border-radius: 5px;
    padding-left: 40px;
    margin-bottom: 10px;
    align-items: center;
    text-decoration: none;

    .Icon {
      top: 50%;
      left: 8px;
      color: white;
      position: absolute;
      transform: translateY(-50%);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }

    &.active {
      color: white;
      background-color: rgba(255, 255, 255, 0.15);

      ${Count} {
        color: white;
      }
    }
  }
`;
