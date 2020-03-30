// A simple react hook that will reset the view scroll back to 0 when the
// component mounts.
import { useEffect } from "react";

function useScrollRestore(selector, dependents = []) {
  useEffect(() => {
    if (selector) {
      const el = document.querySelector(selector);
      if (el && el.strollTo) el.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, dependents);

  return null;
}

export default useScrollRestore;
