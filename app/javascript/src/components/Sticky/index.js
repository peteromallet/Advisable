import React from "react";
import stickybits from "stickybits";
import usePrevious from "../../utilities/usePrevious";

const Sticky = ({ children, offset, enabled = true }) => {
  const ref = React.useRef(null);
  const previouslyEnabled = usePrevious(enabled);

  const stick = () => {
    stickybits(ref.current, {
      stickyBitStickyOffset: offset || 0,
    });
  };

  React.useLayoutEffect(() => {
    if (enabled) {
      stick();
    }
  }, []);

  React.useLayoutEffect(() => {
    if (enabled && !previouslyEnabled) {
      stick();
    }

    if (!enabled && previouslyEnabled) {
      const stickybitsInstancetoBeCleanedup = stickybits(ref.current);
      stickybitsInstancetoBeCleanedup.cleanup();
    }
  }, [enabled]);

  return <div ref={ref}>{children}</div>;
};

export default Sticky;
