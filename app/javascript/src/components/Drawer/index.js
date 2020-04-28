import * as React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Div100vh from "react-div-100vh";
import { Button } from "@advisable/donut";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { useMobile } from "../../components/Breakpoint";
import { Container, Backdrop, Drawer, Actions } from "./styles";
import { X } from "@styled-icons/feather";
export { default as DrawerModal } from "./DrawerModal";

export default ({ isOpen, onClose, children, actions }) => {
  const isMobile = useMobile();
  const drawerRef = React.useRef(null);

  let root = document.getElementById("js-drawer-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "js-drawer-root";
    document.body.appendChild(root);
  }

  const handleKeyPress = (e) => {
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

  const handleBackdropClick = () => {
    onClose();
  };

  return createPortal(
    <Container isOpen={isOpen}>
      <Drawer
        key="drawer"
        as={motion.div}
        ref={drawerRef}
        initial={{
          opacity: 0,
          x: isMobile ? 0 : "100%",
        }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      >
        <Div100vh>
          <Actions>
            {actions}
            <Button
              size="s"
              variant="subtle"
              aria-label="Close Drawer"
              onClick={onClose}
            >
              <X />
            </Button>
          </Actions>
          {children}
        </Div100vh>
      </Drawer>
      <Backdrop onClick={handleBackdropClick} />
    </Container>,
    root,
  );
};
