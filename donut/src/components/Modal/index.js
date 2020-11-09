import React from "react";
import { padding } from "styled-system";
import { rgba } from "polished";
import { motion, AnimatePresence } from "framer-motion";
import { CloseCircle } from "@styled-icons/ionicons-solid";
import Box from "../Box";
import theme from "../../theme";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";
import styled from "styled-components";
export { default as useRoutedModal } from "./useRoutedModal";

export const useModal = useDialogState;

// Z-INDEX FOR MODALS ARE MANAGED INSIDE OF THE BASE STYLES.
export const StyledDialogBackdrop = styled(motion.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: ${(props) => `${props.leftIndent || 32}px`};
  padding-left: ${(props) => `${props.topIndent || 0}px`};
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
    min-height: 100%;
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

function Modal({
  modal,
  label,
  children,
  height,
  loading,
  width = 500,
  topIndent = 0,
  leftIndent = 0,
  padding = "32px",
  showCloseButton = true,
  hideOnClickOutside = true,
}) {
  return (
    <AnimatePresence>
      <DialogBackdrop {...modal}>
        {(backdrop) => (
          <StyledDialogBackdrop
            {...backdrop}
            topIndent={topIndent}
            leftIndent={leftIndent}
            initial={{ opacity: 0 }}
            animate={{
              opacity: modal.visible ? 1 : 0,
            }}
            style={{
              pointerEvents: modal.visible ? "all" : "none",
            }}
          >
            <Dialog
              {...modal}
              aria-label={label}
              preventBodyScroll={false}
              hideOnClickOutside={hideOnClickOutside}
            >
              {(dialogProps) =>
                modal.visible &&
                !loading && (
                  <StyledDialog
                    {...dialogProps}
                    $width={width}
                    padding={padding}
                    height={height}
                    transition={{ duration: 0.32 }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{
                      display: "block",
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{ opacity: 0, y: 40 }}
                  >
                    {showCloseButton ? (
                      <Box position="absolute" top="12px" right="12px">
                        <StyledCloseButton onClick={modal.hide}>
                          <CloseCircle size="32px" />
                        </StyledCloseButton>
                      </Box>
                    ) : null}
                    {children}
                  </StyledDialog>
                )
              }
            </Dialog>
          </StyledDialogBackdrop>
        )}
      </DialogBackdrop>
    </AnimatePresence>
  );
}

Modal.Disclosure = DialogDisclosure;

export default Modal;
