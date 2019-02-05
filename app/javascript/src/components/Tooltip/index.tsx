import * as React from "react";
import Popper from "popper.js";
import TooltipOverlay from "./TooltipOverlay";
import { TooltipWrapper } from "./styles";

export interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "bottom-start";
  pointerEvents?: string;
}

const Tooltip = ({
  children,
  content,
  pointerEvents,
  placement = "bottom-start"
}: Props) => {
  const containerRef = React.useRef(null);
  const tooltipRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const handleBlur = () => setOpen(false);
  const handleFocus = () => setOpen(true);

  React.useLayoutEffect(
    () => {
      if (open && tooltipRef) {
        new Popper(containerRef.current, tooltipRef.current, {
          placement
        });
      }
    },
    [open, tooltipRef]
  );

  return (
    <TooltipWrapper
      ref={containerRef}
      tabIndex={0}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {open && (
        <TooltipOverlay pointerEvents={pointerEvents} ref={tooltipRef}>
          {content}
        </TooltipOverlay>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
