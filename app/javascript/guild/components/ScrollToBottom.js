import React, { useRef, useEffect } from "react";

export const ScrollToBottom = () => {
  const ref = useRef();
  useEffect(() =>
    ref.current.scrollIntoView({ behavior: "smooth", block: "end" }),
  );
  return <div ref={ref} />;
};
