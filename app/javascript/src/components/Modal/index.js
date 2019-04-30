import React from "react";
import ReactDOM from "react-dom";
import { useTransition } from "react-spring";
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { extractSpacingProps } from "../Spacing";
import {
  ModalContainer,
  Backdrop,
  WindowContainer,
  Window,
  CloseModal
} from "./styles";

import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

let modalRoot = document.getElementById("js-modal-root");
if (!modalRoot) {
  modalRoot = document.createElement("div")
  modalRoot.id = "js-modal-root"
  document.body.appendChild(modalRoot);
}

const Modal = ({ isOpen, onClose, children, size, expandOnMobile, ...componentProps }) => {
  const modalRef = React.useRef(null);

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, 100px, 0)" }
  });

  // When the component is unmounting and there is only 1 modal open then set
  // the body overflow back to it was as the last modal is about to close.
  React.useEffect(() => {
    return () => {
      if (modalRoot.children.length <= 1) {
        clearAllBodyScrollLocks()
      }
    }
  }, [])

  React.useLayoutEffect(() => {
    // if there is at least one modal open and the body hasn't been set to
    // overflow hidden then add the various styles to prevent scrolling on the
    // body.
    if (modalRoot.firstChild && document.body.style.overflow !== "hidden") {
      disableBodyScroll(modalRef.current);
    }

    // if there is no more modals then set the body overflow back to what it
    // was.
    if (modalRoot.firstChild === null) {
      clearAllBodyScrollLocks()
    }

  }, [isOpen]);

  // If the modal isn't open then return null
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalContainer expandOnMobile={expandOnMobile}>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <WindowContainer
              key={key}
              size={size}
              style={props}
            >
              <Window
                ref={modalRef}
                className="ModalWindow"
                expandOnMobile={expandOnMobile}
                {...extractSpacingProps(componentProps)}
              >
                <CloseModal aria-label="Close Modal" onClick={onClose}>
                  <svg width={13} height={12} fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.705.295a1.007 1.007 0 0 0-1.42-.006L6 4.573 1.716.29a1.007 1.007 0 0 0-1.42.006c-.39.39-.396 1.03-.006 1.42L4.574 6 .29 10.284c-.39.39-.385 1.03.006 1.42.39.39 1.03.397 1.42.006l4.285-4.284 4.284 4.284c.39.39 1.03.385 1.42-.006.39-.39.397-1.03.006-1.42L7.427 6l4.284-4.285c.39-.39.384-1.03-.006-1.42z"
                      fill="#969CB9"
                    />
                  </svg>
                </CloseModal>
                {children}
              </Window>
            </WindowContainer>
          )
      )}
      <Backdrop onClick={onClose} />
    </ModalContainer>,
    modalRoot
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
