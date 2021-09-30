import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  usePopoverState as useReakitUsePopoverState,
  Popover as ReakitPopover,
  PopoverDisclosure,
} from "reakit/Popover";
import { StyledDropdown } from "./styles";

export function usePopoverState(opts) {
  return useReakitUsePopoverState({
    placement: "top-end",
    ...opts,
    animated: true,
  });
}

export default function Popover({
  disclosure,
  label,
  children,
  onOpen,
  state: popover,
}) {
  useEffect(() => {
    if (onOpen && popover.visible) {
      onOpen();
    }
  }, [popover.visible, onOpen]);

  return (
    <>
      <PopoverDisclosure
        {...popover}
        ref={disclosure.ref}
        {...disclosure.props}
      >
        {(disclosureProps) => React.cloneElement(disclosure, disclosureProps)}
      </PopoverDisclosure>
      <ReakitPopover {...popover} aria-label={label} tabIndex={0}>
        <AnimatePresence>
          {popover.visible && (
            <StyledDropdown
              key="popover"
              as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.24 }}
              onAnimationComplete={popover.stopAnimation}
            >
              {children}
            </StyledDropdown>
          )}
        </AnimatePresence>
      </ReakitPopover>
    </>
  );
}
