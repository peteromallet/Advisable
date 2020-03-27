import { rgba } from "polished";
import { space } from "styled-system";
import { motion } from "framer-motion";
import styled, { css, keyframes } from "styled-components";
import theme from "../../theme";

export const StyledBackdrop = styled(motion.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  position: fixed;
  background: ${rgba(theme.colors.neutral[2], 0.9)};
  ${"" /* Override the display prop that reakit tries to set so that we can handle exit animations */}
  display: block !important;
  pointer-events: ${(props) => (props.hidden ? "none" : "all")};
`;

export const StyledModalWindowContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  padding: 40px;
  position: fixed;
  perspective: 800;
  overflow-y: scroll;
  ${"" /* Override the display prop that reakit tries to set so that we can handle exit animations */}
  display: flex !important;
  pointer-events: ${(props) => (props.hidden ? "none" : "all")};
  ${(props) => props.isMobile && StyledWindowContainerMobile};
`;

const StyledWindowContainerMobile = css`
  padding: 0;
`;

const spin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(359deg);
  }
`;

export const StyledModalLoading = styled.div`
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  color: ${theme.colors.neutral[5]};
  animation: ${spin} 700ms infinite linear;
`;

export const StyledWindow = styled(motion.div)`
  ${space}
  width: 100%;
  margin: auto;
  background: white;
  transform-style: preserve-3d;
  max-width: ${(props) => props.width || 500}px;
  box-shadow: 0 8px 30px ${rgba(theme.colors.neutral[9], 0.1)};
  ${(props) => props.isMobile && StyledWindowMobile};
`;

const StyledWindowMobile = css`
  max-width: 100%;
  min-height: 100%;
`;

export const StyledModalCloseButton = styled.button`
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  outline: none;
  appearance: none;
  background: white;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral[5]};
  border: 1px solid ${theme.colors.neutral[2]};
`;
