import * as React from "react";
import Popper from "popper.js";
import TooltipOverlay from "./TooltipOverlay";
export { default as TooltipPrompt } from "./Prompt";
import { TooltipWrapper } from "./styles";

type Props = {
  size?: string;
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "bottom-start";
  pointerEvents?: string;
};

const Tooltip = ({
  size,
  children,
  content,
  pointerEvents,
  placement = "bottom-start",
}: Props) => {
  const containerRef = React.useRef(null);
  const tooltipRef = React.useRef(null);
  const [mouseOver, setMouseOver] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  // const [open, setOpen] = React.useState(false);

  const handleMouseEnter = () => {
    if (!mouseOver) {
      setMouseOver(true);
    }
  };

  const handleMouseLeave = () => setMouseOver(false);
  const handleBlur = () => setFocused(false);
  const handleFocus = () => {
    if (!focused) {
      setFocused(true);
    }
  };

  const handleClick = () => {
    if (focused) {
      setFocused(false);
    }

    if (mouseOver) {
      setMouseOver(false);
    }

    if (!focused) {
      setFocused(true);
    }
  };

  const open = mouseOver || focused;

  React.useLayoutEffect(() => {
    if (open && tooltipRef) {
      new Popper(containerRef.current, tooltipRef.current, {
        placement,
      });
    }
  }, [open, tooltipRef]);

  return (
    <TooltipWrapper
      ref={containerRef}
      tabIndex={0}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseDown={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {open && (
        <TooltipOverlay
          size={size}
          pointerEvents={pointerEvents}
          ref={tooltipRef}
        >
          {content}
        </TooltipOverlay>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
