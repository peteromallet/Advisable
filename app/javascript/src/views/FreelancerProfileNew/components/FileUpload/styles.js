import styled, { keyframes } from "styled-components";
import { rgba } from "polished";
import { theme } from "@advisable/donut";
import { position, variant } from "styled-system";

const animation = keyframes`
  from {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(6px);
  }

  to {
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export const StyledProgressContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  animation: ${animation} 0.8s ease infinite alternate;
`;

export const StyledProgressBar = styled.div`
  height: 2px;
  width: 180px;
  margin-top: 12px;
  margin-bottom: 8px;
  max-width: 60%;
  overflow: hidden;
  border-radius: 1px;
  background: ${theme.colors.blue100};
  box-shadow: 0 0 1px 0 ${rgba(theme.colors.neutral900, 0.3)};
`;

export const StyledButton = styled.div`
  ${position}

  width: 42px;
  height: 42px;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: white;
  background: ${rgba(theme.colors.neutral200, 0.4)};
  backdrop-filter: blur(8px);
  border: 1px solid;
  border-color: ${theme.colors.neutral300};
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  opacity: 0;

  &:hover {
    opacity: 1;
    color: ${rgba(theme.colors.blue100, 1)};
    background: ${rgba(theme.colors.neutral700, 0.6)};
  }
`;

export const StyledHoverArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:hover + ${StyledButton} {
    opacity: 1;
  }
`;

export const StyledInput = styled.input`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
`;

const type = variant({
  prop: "$type",
  variants: {
    avatar: {
      [StyledHoverArea]: {
        clipPath: "url(#passportSquircle)",
      },
      [StyledProgressContainer]: {
        clipPath: "url(#passportSquircle)",
      },
      [StyledButton]: {
        position: "absolute",
        bottom: "16px",
        right: "-8px",
      },
    },
    cover: {
      [StyledHoverArea]: {
        clipPath: "url(#coverSquircle)",
      },
      [StyledProgressContainer]: {
        clipPath: "url(#coverSquircle)",
      },
      [StyledButton]: {
        position: "absolute",
        bottom: "16px",
        right: "16px",
      },
    },
  },
});

export const StyledWrapper = styled.div`
  ${type}

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
