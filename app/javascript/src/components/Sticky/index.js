import React from "react";
import stickybits from "stickybits";
import { Box } from "@advisable/donut";
import usePrevious from "../../utilities/usePrevious";

const Sticky = ({ children, zIndex, offset = 0, enabled = true }) => {
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

  return (
    <Box zIndex={zIndex} ref={ref}>
      {children}
    </Box>
  );
};

export default Sticky;
