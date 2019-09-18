import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { ScrollableContainer, ScrollInner } from "./styles";
import { extractSpacingProps } from "src/components/Spacing";

export default ({ children, height, ...props }) => {
  const [topShadow, setTopShadow] = useState(false);
  const [bottomShadow, setBottomShadow] = useState(false);
  const scrollRef = useRef(null);

  const setShadows = el => {
    if (!el) return;
    const { scrollTop, clientHeight, scrollHeight } = el;
    setBottomShadow(scrollTop + clientHeight < scrollHeight);
    setTopShadow(scrollTop > 0);
  };

  const handleScroll = e => {
    window.requestAnimationFrame(() => {
      setShadows(e.target);
    });
  };

  useLayoutEffect(() => {
    setTimeout(() => setShadows(scrollRef.current), 10);
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () => scrollRef.current.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return (
    <ScrollableContainer topShadow={topShadow} bottomShadow={bottomShadow}>
      <ScrollInner
        {...extractSpacingProps(props)}
        ref={scrollRef}
        height={height}
      >
        {children}
      </ScrollInner>
    </ScrollableContainer>
  );
};
