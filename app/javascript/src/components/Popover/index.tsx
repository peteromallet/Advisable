import * as React from "react";
import { isFunction } from "lodash";
import { useTransition, animated } from "react-spring";
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
  onClick?: (e: React.SyntheticEvent) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default ({ children, trigger, placement, onClick, ...props }: Props) => {
  const [open, setOpen] = React.useState(props.isOpen || false);
  const triggerRef = React.useRef(null);
  const popoverRef = React.useRef(null);

  const transitions = useTransition(open, null, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: { mass: 1, tension: 500, friction: 30 },
  });

  const handleClick = e => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented) {
      setOpen(!open);
    }
  };

  const handleFocusClose = e => {
    setOpen(false)
  }

  const handleDocumentClick = e => {
    if (popoverRef.current && popoverRef.current.contains(e.target)) {
      return;
    }

    if (triggerRef.current && triggerRef.current.contains(e.target)) {
      return;
    }

    if (open) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (!open && props.onClose) {
      props.onClose();
    }
  }, [open]);

  React.useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  React.useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [open]);

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
        close: () => setOpen(false),
      });
    }

    return children;
  };

  const triggerProps = {
    ref: triggerRef,
    onClick: handleClick,
  };

  return (
    <>
      {React.cloneElement(trigger, triggerProps)}
      <div ref={popoverRef}>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                {renderChildren()}
                <div onFocus={handleFocusClose} tabIndex={0} />
              </animated.div>
            )
        )}
      </div>
    </>
  );
};
