import * as React from "react";
import { createPortal } from "react-dom";
import { useTransition } from "react-spring";
import { Container, Backdrop, Drawer } from "./styles";

const root = document.createElement("div");
document.body.appendChild(root);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default ({ isOpen, onClose, children }: Props) => {
  const fadeTransition = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const drawerTransition = useTransition(isOpen, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
    config: {
      mass: 1,
      tension: 320,
      friction: 35,
    }
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
                  <Drawer key={drawer.key} style={drawer.props}>
                    {children}
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
