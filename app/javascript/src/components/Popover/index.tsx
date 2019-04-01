import * as React from "react";
import { isFunction } from "lodash";
import Popper, { Placement } from "popper.js";

// Popover provides a simple component to built UI elements that have popover
// components to them such as datepickers or dropdown menus.
// e.g
// <Popover trigger={<button>Open</button>}>
//   This is the popover content
// </Popover>
//
// If you need to close the popout from an action you can use the render prop
// pattern.
// e.g
// <Popover trigger={<button>Open</button>}>
//   {popover => (
//     <button onClick={popover.close}>Close</button>
//   )}
// </Popover>
interface RenderProps {
  close: () => void;
}

interface Props {
  children: ((props: RenderProps) => React.ReactNode) | React.ReactNode;
  trigger: React.ReactElement<any>;
  placement?: Placement;
}

export default ({ children, trigger, placement }: Props) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  const handleFocus = () => {
    setOpen(!open);
  };

  const handleDocumentClick = e => {
    if (popoverRef.current && popoverRef.current.contains(e.target)) {
      return;
    }

    if (triggerRef.current && triggerRef.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  React.useLayoutEffect(() => {
    if (open && triggerRef.current && popoverRef.current) {
      new Popper(triggerRef.current, popoverRef.current, {
        placement: placement || "bottom-start",
      });
    }
  }, [open, popoverRef]);

  const renderChildren = () => {
    if (isFunction(children)) {
      return (children as (props: RenderProps) => React.ReactNode)({
        close: () => setOpen(false)
      });
    }

    return children;
  };

  const triggerProps = {
    ref: triggerRef,
    onFocus: handleFocus
  }

  return (
    <>
      {React.cloneElement(trigger, triggerProps)}
      {open && <div ref={popoverRef}>{renderChildren()}</div>}
    </>
  );
};
