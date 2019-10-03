import { rgba } from "polished";
import styled, { keyframes } from "styled-components";

const copiedAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  25%, 75% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-15px);
  }
`;

export const CopyURL = styled.div`
  height: 40px;
  margin: 0 auto;
  max-width: 100%;
  position: relative;
  background: ${props => props.bg || "#f5f7ff"};
  border-radius: 30px;

  &::after {
    top: 0;
    right: 0;
    z-index: 1;
    content: "";
    height: 100%;
    width: 110px;
    position: absolute;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background: linear-gradient(
      270deg,
      ${props => props.bg || "#f5f7ff"} 70%,
      ${props => rgba(props.bg || "#f5f7ff", 0)} 100%
    );
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    color: #1e3458;
    font-size: 14px;
    padding: 0 20px;
    font-weight: 500;
    appearance: none;
    outline: none;
    letter-spacing: -0.01em;
    background: transparent;
  }

  button {
    top: 50%;
    z-index: 2;
    right: 8px;
    border: none;
    height: 24px;
    outline: none;
    color: #173fcd;
    cursor: pointer;
    font-size: 11px;
    padding: 0 15px;
    font-weight: 600;
    appearance: none;
    line-height: 24px;
    background: white;
    position: absolute;
    border-radius: 20px;
    text-transform: uppercase;
    transform: translateY(-50%);
    box-shadow: 0px 2px 8px rgba(0, 20, 90, 0.08);
  }

  span {
    right: 0;
    top: -20px;
    color: #173fcd;
    font-size: 12px;
    position: absolute;
    animation: ${copiedAnimation} 1.5s cubic-bezier(0.3, 0, 0, 1) forwards;
  }
`;
