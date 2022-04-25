import React, { useLayoutEffect, useCallback, useRef } from "react";

export default function EndlessScroll({ onLoadMore = () => {} }) {
  const ref = useRef(null);

  const callback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        onLoadMore();
      }
    },
    [onLoadMore],
  );

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(callback);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback]);

  return <div ref={ref} />;
}
