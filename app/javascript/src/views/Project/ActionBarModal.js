import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { rgba } from "polished";
import { theme } from "@advisable/donut";
import { Dialog, DialogBackdrop } from "reakit/Dialog";
import { ActionBarContext } from "./ActionBarContainer";

const StyledDialogBackdrop = styled(motion.div)`
  top: 60px;
  bottom: 0;
  left: 650px;
  z-index: 100;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(245, 246, 251, 0.9);
`;

const StyledDialog = styled(motion.div)`
  width: 500px;
  padding: 32px;
  outline: none;
  background: white;
  box-shadow: 0 24px 64px -24px ${rgba(theme.colors.neutral900, 0.6)};
`;

export default function ActionBarModal({ dialog, label, children }) {
  const barContainer = useContext(ActionBarContext);

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
              left: barContainer.left - 20,
              width: barContainer.width + 40,
              pointerEvents: dialog.visible ? "all" : "none",
            }}
          >
            <Dialog {...dialog} aria-label={label}>
              {(dialogProps) => (
                <StyledDialog
                  {...dialogProps}
                  transition={{ duration: 0.32 }}
                  initial={{ opacity: 0 }}
                  animate={{
                    display: "flex",
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
