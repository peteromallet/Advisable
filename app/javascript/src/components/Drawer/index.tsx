import * as React from "react";
import { createPortal } from "react-dom";
import { useTransition } from "react-spring";
import Div100vh from "react-div-100vh";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import Icon from "../Icon";
import { useMobile } from "../../components/Breakpoint";
import { Container, Backdrop, Drawer, CloseButton } from "./styles";

const root = document.createElement("div");
document.body.appendChild(root);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default ({ isOpen, onClose, children }: Props) => {
  const isMobile = useMobile();
  const drawerRef = React.useRef(null);

  const handleKeyPress = e => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  React.useEffect(() => {
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  React.useLayoutEffect(() => {
    if (isOpen && document.body.style.overflow !== "hidden") {
      disableBodyScroll(drawerRef.current);
    }

    if (!isOpen) {
      clearAllBodyScrollLocks();
    }
  }, [isOpen]);

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const fadeTransition = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const drawerTransition = useTransition(isOpen, null, {
    from: {
      transform: isMobile
        ? "translate3d(0, 100%, 0)"
        : "translate3d(100%, 0, 0)",
    },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: {
      transform: isMobile
        ? "translate3d(0, 100%, 0)"
        : "translate3d(100%, 0, 0)",
    },
    config: {
      mass: 1,
      tension: 320,
      friction: 35,
    },
  });

  const handleBackdropClick = () => {
    onClose();
  };

  return createPortal(
    fadeTransition.map(
      fade =>
        fade.item && (
          <Container key={fade.key} isOpen={isOpen}>
            {drawerTransition.map(
              drawer =>
                drawer.item && (
                  <Drawer ref={drawerRef} key={drawer.key} style={drawer.props}>
                    <Div100vh>
                      <CloseButton aria-label="Close Drawer" onClick={onClose}>
                        <Icon icon="x" strokeWidth={2} />
                      </CloseButton>
                      {children}
                    </Div100vh>
                  </Drawer>
                )
            )}
            <Backdrop onClick={handleBackdropClick} style={fade.props} />
          </Container>
        )
    ),
    root
  );
};
