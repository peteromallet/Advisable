import { rgba } from "polished";
import styled, { keyframes } from "styled-components";
import { theme } from "@advisable/donut";

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
  height: 48px;
  margin: 0 auto;
  max-width: 100%;
  position: relative;
  background: ${(props) => props.bg || "#f5f7ff"};
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
      ${(props) => props.bg || "#f5f7ff"} 70%,
      ${(props) => rgba(props.bg || "#f5f7ff", 0)} 100%
    );
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    color: ${theme.colors.neutral700};
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
    height: 36px;
    outline: none;
    color: ${theme.colors.blue600};
    cursor: pointer;
    font-size: 11px;
    padding: 0 20px;
    font-weight: 600;
    appearance: none;
    line-height: 24px;
    background: white;
    position: absolute;
    border-radius: 20px;
    text-transform: uppercase;
    transform: translateY(-50%);
    box-shadow: 0px 1px 5px rgba(0, 20, 90, 0.18);
  }

  button:hover {
    color: ${theme.colors.blue700};
    box-shadow: 0px 1px 8px -2px rgba(0, 20, 90, 0.4);
  }

  span {
    right: 0;
    top: -28px;
    color: ${theme.colors.blue500};
    font-size: 12px;
    position: absolute;
    background: white;
    padding: ${theme.space[1]};
    border-radius: 8px;
    box-shadow: 0px 1px 5px rgba(0, 20, 90, 0.18);

    animation: ${copiedAnimation} 1.5s cubic-bezier(0.3, 0, 0, 1) forwards;
  }
`;
