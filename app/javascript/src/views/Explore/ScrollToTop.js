import { ArrowUp } from "@styled-icons/heroicons-outline";
import React, { useEffect, useState } from "react";
import composeStyles from "src/utilities/composeStyles";

const THRESHOLD = 200;

const classes = composeStyles({
  base: "fixed z-10 w-12 h-12 rounded-full shadow-xl bg-neutral-700 hover:bg-neutral-900 grid place-items-center bottom-4 left-4 opacity-0 invisible transition-opacity",
  variants: {
    enabled: "!visible !opacity-100",
  },
});

export default function ScrollToTop() {
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkScroll = () => {
      const show = window.scrollY > THRESHOLD;
      if (!enabled && show) {
        setEnabled(true);
      }

      if (enabled && !show) {
        setEnabled(false);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [enabled]);

  return (
    <button className={classes({ enabled })} onClick={handleClick}>
      <ArrowUp className="w-5 h-5 text-white" />
    </button>
  );
}
