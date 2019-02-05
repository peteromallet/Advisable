import * as React from "react";
import { TooltipOverlay as Container } from "./styles";

interface Props {
  ref: any;
  children: React.ReactNode;
  pointerEvents?: string;
}

const TooltipOverlay = React.forwardRef(({ children, pointerEvents }: Props, ref) => {
  return (
    <Container ref={ref} pointerEvents={pointerEvents}>
      {children}
    </Container>
  );
});

export default TooltipOverlay;
