import * as React from "react";
import * as ReactDOM from "react-dom";
import { TooltipOverlay as Container } from "./styles";

const tooltipsEl = document.createElement("div");
tooltipsEl.style.position = 'absolute'
tooltipsEl.style.width = '100%'
document.body.appendChild(tooltipsEl);

interface Props {
  ref: any;
  children: React.ReactNode;
  pointerEvents?: string;
}

const TooltipOverlay = React.forwardRef(
  ({ children, pointerEvents }: Props, ref) => {
    return ReactDOM.createPortal(
      <Container ref={ref} pointerEvents={pointerEvents}>
        {children}
      </Container>,
      tooltipsEl
    );
  }
);

export default TooltipOverlay;
