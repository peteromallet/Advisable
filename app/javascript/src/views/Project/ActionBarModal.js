import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { rgba } from "polished";
import { theme } from "@advisable/donut";
import { Dialog, DialogBackdrop } from "reakit/Dialog";

const StyledDialogBackdrop = styled(motion.div)`
  top: 58px;
  right: 0;
  bottom: 0;
  left: 280px;
  z-index: 100;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(245, 246, 251, 0.9);

  overflow-y: scroll;
  padding-top: 32px;
  padding-bottom: 64px;
`;

const StyledDialog = styled(motion.div)`
  width: ${(p) => p.$width}px;
  margin: auto;
  padding: 32px;
  outline: none;
  background: white;
  border-radius: 12px;
  box-shadow: 0 24px 64px -24px ${rgba(theme.colors.neutral900, 0.6)};
`;

export default function ActionBarModal({
  width = 500,
  dialog,
  label,
  children,
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
            <Dialog {...dialog} aria-label={label}>
              {(dialogProps) => (
                <StyledDialog
                  {...dialogProps}
                  $width={width}
                  transition={{ duration: 0.32 }}
                  initial={{ opacity: 0 }}
                  animate={{
                    display: "block",
                    opacity: dialog.visible ? 1 : 0,
                    y: dialog.visible ? 0 : 40,
                  }}
                >
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
