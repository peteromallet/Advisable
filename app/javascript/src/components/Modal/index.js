import React from "react";
import ReactDOM from "react-dom";
import { Spring } from "react-spring";
import { extractSpacingProps } from "../Spacing";
import {
  ModalContainer,
  Backdrop,
  Window,
  CloseModal,
} from "./styles";

import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";

const modalRoot = document.getElementById("js-modal-root");

class Modal extends React.Component {
  static Header = ModalHeader
  static Body = ModalBody

  state = {
    scrollPosition: null
  };

  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.restore();

    if (this.props.isOpen) {
      window.scrollTo(0, this.state.scrollPosition);
    }

    modalRoot.removeChild(this.el);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen === false && this.props.isOpen) {
      const scrollPosition =
        (window.pageYOffset || document.documentElement.scrollTop) -
        (document.documentElement.clientTop || 0);
      this.setState({ scrollPosition });
      document.body.style.overflow = "hidden";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.position = "fixed";
      window.addEventListener("keydown", this.handleKeyDown);
    }

    if (prevProps.isOpen && this.props.isOpen === false) {
      this.restore();
      window.scrollTo(0, this.state.scrollPosition);
    }
  }

  restore() {
    document.body.style.overflow = "scroll";
    document.body.style.top = "0px";
    document.body.style.position = "static";
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    if (!this.props.isOpen) return null;

    return ReactDOM.createPortal(
      <ModalContainer
        ref={c => (this.modalContainer = c)}
        expandOnMobile={this.props.expandOnMobile}
      >
          <Spring
            from={{ opacity: 0, translateY: 100 }}
            to={{
              opacity: this.props.isOpen ? 1 : 0,
              translateY: this.props.isOpen ? 0 : 100
            }}
          >
            {styles => (
              <Window
                styles={styles}
                className="ModalWindow"
                size={this.props.size}
                {...extractSpacingProps(this.props)}
                expandOnMobile={this.props.expandOnMobile}
              >
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
