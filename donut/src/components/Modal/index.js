import React, { useRef } from "react";
import { Portal } from "reakit/Portal";
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from "reakit/Dialog";

import { AnimatePresence } from "framer-motion";
import { StyledBackdrop, StyledWindowContainer, StyledWindow } from "./styles";
import useBreakpoint from "../../hooks/useBreakpoint";

export const useModal = useDialogState;

const Modal = ({ modal, label, children, backdrop, ...props }) => {
  const ref = useRef(null);
  const mediumAndUp = useBreakpoint("mUp");
  const isMobile = !mediumAndUp;

  const handleContainerClick = e => {
    if (e.target === ref.current) {
      modal.hide();
    }
  };

  const backdropVariants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <>
      {backdrop && (
        <Portal>
          <DialogBackdrop
            {...modal}
            initial="hidden"
            as={StyledBackdrop}
            variants={backdropVariants}
            animate={modal.visible ? "visible" : "hidden"}
            transition={{ ease: "easeOut" }}
          />
        </Portal>
      )}
      <Dialog
        ref={ref}
        {...modal}
        aria-label={label}
        as={StyledWindowContainer}
        onClick={handleContainerClick}
        isMobile={isMobile}
      >
        <AnimatePresence>
          {modal.visible && (
            <StyledWindow
              {...props}
              isMobile={isMobile}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              initial={{
                y: 80,
                opacity: 0,
                rotateX: isMobile ? 0 : -15,
                scale: isMobile ? 1 : 0.9,
              }}
              animate={{
                y: 0,
                opacity: 1,
                rotateX: 0,
                scale: 1,
              }}
              exit={{
                y: 80,
                opacity: 0,
                rotateX: isMobile ? 0 : -15,
                scale: isMobile ? 1 : 0.9,
              }}
            >
              {children}
            </StyledWindow>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
};

Modal.defaultProps = {
  backdrop: true,
};

Modal.Disclosure = DialogDisclosure;

export default Modal;
