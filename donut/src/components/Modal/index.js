import React from "react";
import { AnimatePresence } from "framer-motion";
import { X } from "@styled-icons/heroicons-solid/X";
import Box from "../Box";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";
export { default as useRoutedModal } from "./useRoutedModal";
import CircularButton from "src/components/CircularButton";
import { StyledDialogBackdrop, StyledDialog } from "./styles";
import usePreventBodyScroll from "./usePreventBodyScroll";

export function useModal(opts) {
  return useDialogState({
    ...opts,
    animated: true,
  });
}

function Modal({
  modal,
  label,
  children,
  loading,
  width = 520,
  padding = "32px",
  showCloseButton = true,
  hideOnClickOutside = true,
}) {
  usePreventBodyScroll(modal.visible);

  const handleClose = (e) => {
    e.stopPropagation();
    modal.hide();
  };

  return (
    <DialogBackdrop {...modal}>
      {(backdrop) => (
        <StyledDialogBackdrop
          {...backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: modal.visible ? 1 : 0 }}
          style={{ pointerEvents: modal.visible ? "all" : "none" }}
          oAnimationComplete={modal.stopAnimation}
        >
          <Dialog
            {...modal}
            aria-label={label}
            hideOnClickOutside={hideOnClickOutside}
            preventBodyScroll={false}
          >
            {(dialogProps) => (
              <AnimatePresence>
                {modal.visible && !loading && (
                  <StyledDialog
                    {...dialogProps}
                    $width={width}
                    padding={padding}
                    transition={{ duration: 0.4 }}
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.96 }}
                    oAnimationComplete={modal.stopAnimation}
                  >
                    {showCloseButton ? (
                      <Box position="absolute" top="12px" right="12px">
                        <CircularButton onClick={handleClose} icon={X} />
                      </Box>
                    ) : null}
                    {children}
                  </StyledDialog>
                )}
              </AnimatePresence>
            )}
          </Dialog>
        </StyledDialogBackdrop>
      )}
    </DialogBackdrop>
  );
}

Modal.Disclosure = DialogDisclosure;

export default Modal;
