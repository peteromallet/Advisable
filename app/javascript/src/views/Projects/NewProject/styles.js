import { rgba } from "polished";
import styled, { keyframes } from "styled-components";
import { theme, StyledCard } from "@advisable/donut";

export const StyledNewProjectIcon = styled.div`
  width: 60px;
  height: 60px;
  color: white;
  display: flex;
  position: relative;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    width: 100%;
    z-index: 0;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    background: ${theme.colors.blue500};
    transition: background 700ms, transform 700ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1.6);
    box-shadow: 0 2px 8px ${rgba(theme.colors.neutral900, 0.1)};
  }

  svg {
    z-index: 1;
  }
`;

const loadingAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.6);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0.6);
  }
`;

export const StyledNewProjectLoading = styled.div`
  display: flex;
  position: relative;

  div {
    width: 6px;
    opacity: 0;
    height: 6px;
    margin: 0 2px;
    background: white;
    border-radius: 50%;
  }

  div:nth-child(1) {
    animation: ${loadingAnimation} 1s infinite;
  }

  div:nth-child(2) {
    animation: ${loadingAnimation} 1s 0.2s infinite;
  }

  div:nth-child(3) {
    animation: ${loadingAnimation} 1s 0.4s infinite;
  }
`;

export const StyledNewProject = styled(StyledCard)`
  width: 100%;
  height: 300px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  position: relative;
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  letter-spacing: -0.01em;
  color: ${theme.colors.neutral800};
  box-shadow: ${theme.shadows.m};
  transition: box-shadow 200ms;

  &:hover {
    color: ${theme.colors.blue800};
    border-color: ${theme.colors.neutral400};
    box-shadow: ${theme.shadows.l};

    ${StyledNewProjectIcon} {
      &::before {
        transform: scale(1.1);
        background: ${theme.colors.blue800};
        box-shadow: 0 4px 12px ${rgba(theme.colors.neutral900, 0.1)};
      }
    }
  }
`;
