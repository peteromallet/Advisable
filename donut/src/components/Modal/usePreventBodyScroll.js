import { useLayoutEffect } from "react";

export default function usePreventBodyScroll(enabled) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const { documentElement } = document;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = documentElement.style.overflow;
    const previousPaddingRight = documentElement.style.paddingRight;
    documentElement.style.overflow = "hidden";
    documentElement.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      documentElement.style.overflow = previousOverflow;
      documentElement.style.paddingRight = previousPaddingRight;
    };
  }, [enabled]);
}
