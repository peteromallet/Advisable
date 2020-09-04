import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseCircle } from "@styled-icons/ionicons-solid";
import styled from "styled-components";
import { padding } from "styled-system";
import { rgba } from "polished";
import { theme, Box, Button } from "@advisable/donut";
import { Dialog, DialogBackdrop } from "reakit/Dialog";

const StyledDialogBackdrop = styled(motion.div)`
  top: 58px;
  right: 0;
  bottom: 0;
  left: 280px;
  z-index: 10;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(245, 246, 251, 0.9);

  overflow-y: scroll;
  padding-top: 32px;
  padding-bottom: 64px;

  @media (max-width: 1024px) {
    left: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const StyledDialog = styled(motion.div)`
  ${padding};

  width: 100%;
  margin: auto;
  outline: none;
  background: white;
  position: relative;
  border-radius: 12px;
  max-width: ${(p) => p.$width}px;
  box-shadow: 0 24px 64px -24px ${rgba(theme.colors.neutral900, 0.6)};

  @media (max-width: 1024px) {
    height: 100%;
    max-width: 100%;
  }
`;

const StyledCloseButton = styled.button`
  border: none;
  outline: none;
  appearance: none;
  width: 32px;
  height: 32px;
  display: flex;
  padding: 0;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${theme.colors.neutral300};

  &:hover {
    color: ${theme.colors.neutral700};
  }
`;

export default function ActionBarModal({
  width = 500,
  dialog,
  label,
  children,
  padding = "32px",
}) {
  return (
    <AnimatePresence>
      <DialogBackdrop {...dialog}>
        {(backdrop) => (
          <StyledDialogBackdrop
            {...backdrop}
            style={{}}
            initial={{ opacity: 0 }}
            animate={{
              opacity: dialog.visible ? 1 : 0,
              pointerEvents: dialog.visible ? "all" : "none",
            }}
          >
            <Dialog {...dialog} aria-label={label} preventBodyScroll={false}>
              {(dialogProps) => (
                <StyledDialog
                  {...dialogProps}
                  $width={width}
                  padding={padding}
                  transition={{ duration: 0.32 }}
                  initial={{ opacity: 0 }}
                  animate={{
                    display: "block",
                    opacity: dialog.visible ? 1 : 0,
                    y: dialog.visible ? 0 : 40,
                  }}
                >
                  <Box position="absolute" top="12px" right="12px">
                    <StyledCloseButton onClick={dialog.hide}>
                      <CloseCircle size="32px" />
                    </StyledCloseButton>
                  </Box>
                  {children}
                </StyledDialog>
              )}
            </Dialog>
          </StyledDialogBackdrop>
        )}
      </DialogBackdrop>
    </AnimatePresence>
  );
}
