// DEPRECATED: Please use the Modal component from Donut instead.
import React from "react";
import ReactDOM from "react-dom";
import Div100vh from "react-div-100vh";
import { X } from "@styled-icons/feather";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { extractSpacingProps } from "../Spacing";
import {
  ModalContainer,
  Backdrop,
  WindowContainer,
  Window,
  CloseModal,
} from "./styles";

import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

const Modal = ({
  isOpen,
  onClose,
  children,
  size,
  expandOnMobile,
  ...componentProps
}) => {
  const containerRef = React.useRef(null);

  let modalRoot = document.getElementById("js-modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "js-modal-root";
    document.body.appendChild(modalRoot);
  }

  React.useEffect(() => {
    if (isOpen) {
      disableBodyScroll(containerRef);
    } else {
      enableBodyScroll(containerRef);
    }
  }, [isOpen]);

  // If the modal isn't open then return null
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalContainer ref={containerRef} expandOnMobile={expandOnMobile}>
      <Div100vh
        style={{
          height: "100rvh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <WindowContainer size={size}>
          <Window
            role="dialog"
            className="ModalWindow"
            {...extractSpacingProps(componentProps)}
          >
            {onClose && (
              <CloseModal aria-label="Close Modal" onClick={onClose}>
                <X size={20} strokWidth={1.5} />
              </CloseModal>
            )}
            {children}
          </Window>
        </WindowContainer>
      </Div100vh>
      <Backdrop onClick={onClose} />
    </ModalContainer>,
    modalRoot,
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
