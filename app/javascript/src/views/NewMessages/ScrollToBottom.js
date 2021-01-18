import React, { useRef, useLayoutEffect } from "react";

export default function ScrollToBottom() {
  const ref = useRef();
  const behavior = useRef("auto");

  useLayoutEffect(() => {
    ref.current.scrollIntoView({ behavior: behavior.current, block: "end" });
    behavior.current = "smooth";
  });

  return <div ref={ref} />;
}
