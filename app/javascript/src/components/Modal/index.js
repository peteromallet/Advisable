// DEPRECATED: Please use the Modal component from Donut instead.
import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { use100vh } from "react-div-100vh";
import { X } from "@styled-icons/feather";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
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
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
}) => {
  const height = use100vh();
  const containerRef = useRef(null);
  const paddingProps = {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
  };

  let modalRoot = document.getElementById("js-modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "js-modal-root";
    document.body.appendChild(modalRoot);
  }

  useEffect(() => {
    const container = containerRef.current;
    if (isOpen) {
      disableBodyScroll(container);
    } else {
      if (container) {
        enableBodyScroll(container);
      }
    }
  }, [isOpen]);

  // If the modal isn't open then return null
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalContainer ref={containerRef} expandOnMobile={expandOnMobile}>
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
        }}
      >
        <WindowContainer size={size}>
          <Window role="dialog" className="ModalWindow" {...paddingProps}>
            {onClose && (
              <CloseModal aria-label="Close Modal" onClick={onClose}>
                <X size={20} strokWidth={1.5} />
              </CloseModal>
            )}
            {children}
          </Window>
        </WindowContainer>
      </div>
      <Backdrop onClick={onClose} />
    </ModalContainer>,
    modalRoot,
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
