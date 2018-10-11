import React from "react";
import ReactDOM from "react-dom";
import { Spring } from "react-spring";
import Icon from "src/components/Icon";
import { ModalContainer, Backdrop, Window, CloseModal } from "./styles";

const modalRoot = document.getElementById("js-modal-root");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    if (!this.props.isOpen) return null;

    return ReactDOM.createPortal(
      <ModalContainer>
        <Spring
          from={{ opacity: 0, translateY: 100 }}
          to={{
            opacity: this.props.isOpen ? 1 : 0,
            translateY: this.props.isOpen ? 0 : 100
          }}
        >
          {styles => (
            <Window className="ModalWindow" styles={styles}>
              <CloseModal onClick={this.props.onClose}>
                <svg width={13} height={12} fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.705.295a1.007 1.007 0 0 0-1.42-.006L6 4.573 1.716.29a1.007 1.007 0 0 0-1.42.006c-.39.39-.396 1.03-.006 1.42L4.574 6 .29 10.284c-.39.39-.385 1.03.006 1.42.39.39 1.03.397 1.42.006l4.285-4.284 4.284 4.284c.39.39 1.03.385 1.42-.006.39-.39.397-1.03.006-1.42L7.427 6l4.284-4.285c.39-.39.384-1.03-.006-1.42z"
                    fill="#969CB9"
                  />
                </svg>
              </CloseModal>
              {this.props.children}
            </Window>
          )}
        </Spring>
        <Backdrop onClick={this.props.onClose} />
      </ModalContainer>,
      this.el
    );
  }
}

export default Modal;
