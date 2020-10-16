import { useRef, useLayoutEffect } from "react";
import stickybits from "stickybits";
import usePrevious from "../../utilities/usePrevious";

const Sticky = ({ children, offset = 0, enabled = true }) => {
  const ref = useRef(null);
  const previouslyEnabled = usePrevious(enabled);

  const stick = () => {
    stickybits(ref.current, {
      stickyBitStickyOffset: offset || 0,
    });
  };

  useLayoutEffect(() => {
    if (enabled) {
      stick();
    }
  }, []);

  useLayoutEffect(() => {
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
