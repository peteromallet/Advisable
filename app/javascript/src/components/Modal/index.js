import React from "react";
import ReactDOM from "react-dom";
import Div100vh from "react-div-100vh";
import { Icon } from "@advisable/donut";
import { useTransition } from "react-spring";
import { RemoveScroll } from "react-remove-scroll";
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
  let modalRoot = document.getElementById("js-modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "js-modal-root";
    document.body.appendChild(modalRoot);
  }

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, 100px, 0)" },
  });

  // If the modal isn't open then return null
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <RemoveScroll>
      <ModalContainer expandOnMobile={expandOnMobile}>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <Div100vh
                key={key}
                style={{
                  height: "100rvh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <WindowContainer size={size} style={props}>
                  <Window
                    className="ModalWindow"
                    {...extractSpacingProps(componentProps)}
                  >
                    {onClose && (
                      <CloseModal aria-label="Close Modal" onClick={onClose}>
                        <Icon icon="x" width={20} strokeWidth={1.5} />
                      </CloseModal>
                    )}
                    {children}
                  </Window>
                </WindowContainer>
              </Div100vh>
            )
        )}
        <Backdrop onClick={onClose} />
      </ModalContainer>
    </RemoveScroll>,
    modalRoot
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
