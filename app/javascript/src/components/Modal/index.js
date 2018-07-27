import React from "react";
import ReactDOM from "react-dom";
import { Spring } from "react-spring";
import { ModalContainer, Backdrop, Window } from "./styles";

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
          }}>
          {styles => (
            <Window className="ModalWindow" styles={styles}>
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
