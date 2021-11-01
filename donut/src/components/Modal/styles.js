import { padding } from "styled-system";
import { rgba } from "polished";
import { motion } from "framer-motion";
import theme from "../../theme";
import styled from "styled-components";

// Z-INDEX FOR MODALS ARE MANAGED INSIDE OF THE BASE STYLES.
export const StyledDialogBackdrop = styled(motion.div)`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: fixed;
  display: grid;
  place-items: center;
  overflow-y: scroll;
  -webkit-backdrop-filter: blur(2px);
  background: ${rgba(theme.colors.neutral100, 0.9)};

  @media (max-width: 1024px) {
    left: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const StyledDialog = styled(motion.div)`
  ${padding};

  width: 100%;
  margin: auto;
  outline: none;
  background: white;
  position: relative;
  border-radius: 24px;
  max-width: ${(p) => p.$width}px;
  box-shadow: 0 24px 52px -12px ${rgba(theme.colors.neutral900, 0.32)},
    0 4px 8px 0 ${rgba(theme.colors.neutral900, 0.08)};

  @media (max-width: 1024px) {
    min-height: 100%;
    max-width: 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
