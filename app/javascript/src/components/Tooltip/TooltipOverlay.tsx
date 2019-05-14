import * as React from "react";
import * as ReactDOM from "react-dom";
import { TooltipOverlay as Container } from "./styles";

const tooltipsEl = document.createElement("div");
tooltipsEl.style.position = "absolute";
tooltipsEl.style.width = "100%";
document.body.appendChild(tooltipsEl);

interface Props {
  ref: any;
  size?: string;
  children: React.ReactNode;
  pointerEvents?: string;
}

const TooltipOverlay = React.forwardRef(
  ({ children, size, pointerEvents }: Props, ref) => {
    return ReactDOM.createPortal(
      <Container ref={ref} size={size} pointerEvents={pointerEvents}>
        {children}
      </Container>,
      tooltipsEl
    );
  }
);

export default TooltipOverlay;
