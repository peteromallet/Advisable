// A simple react hook that will reset the view scroll back to 0 when the
// component mounts.
import { useLayoutEffect } from "react";

export default (selector, dependents = []) => {
  useLayoutEffect(() => {
    if (selector) {
      const el = document.querySelector(selector);
      if (el) el.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, dependents);
};
