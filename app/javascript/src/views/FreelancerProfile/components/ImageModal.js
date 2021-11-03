import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Dialog, DialogBackdrop } from "reakit/Dialog";

export const StyledDialogBackdrop = styled(motion.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(245, 246, 251, 0.9);

  overflow-y: scroll;
  padding-bottom: 64px;

  @media (max-width: 1024px) {
    left: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const StyledDialog = styled(motion.div)`
  margin: auto;
  outline: none;
  position: relative;
  transform: translate3d(0, 0, 0);
`;

export default function ImageModal({ modal, children }) {
  return (
    <DialogBackdrop {...modal}>
      {(backdrop) => (
        <StyledDialogBackdrop
          {...backdrop}
          initial={{ opacity: 0 }}
          animate={{
            opacity: modal.visible ? 1 : 0,
          }}
          style={{
            pointerEvents: modal.visible ? "all" : "none",
          }}
        >
          <Dialog {...modal} tabIndex={0} aria-label="Welcome">
            {(modalProps) =>
              modal.visible && (
                <StyledDialog
                  {...modalProps}
                  transition={{ duration: 0.32 }}
                  initial={{ opacity: 0 }}
                  animate={{
                    display: "block",
                    opacity: 1,
                  }}
                  exit={{ opacity: 0 }}
                >
                  {children}
                </StyledDialog>
              )
            }
          </Dialog>
        </StyledDialogBackdrop>
      )}
    </DialogBackdrop>
  );
}
