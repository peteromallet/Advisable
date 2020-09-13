import React, { useRef, useState, useLayoutEffect } from "react";
import { ScrollableContainer, ScrollInner } from "./styles";

function Scrollable({ children, height }) {
  const [topShadow, setTopShadow] = useState(false);
  const [bottomShadow, setBottomShadow] = useState(false);
  const scrollRef = useRef(null);

  const setShadows = (el) => {
    if (!el) return;
    const { scrollTop, clientHeight, scrollHeight } = el;
    setBottomShadow(scrollTop + clientHeight < scrollHeight);
    setTopShadow(scrollTop > 0);
  };

  const handleScroll = (e) => {
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
      <ScrollInner ref={scrollRef} height={height}>
        {children}
      </ScrollInner>
    </ScrollableContainer>
  );
}

export default Scrollable;
