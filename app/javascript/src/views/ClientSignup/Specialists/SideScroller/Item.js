import React, { useRef, useCallback } from "react";
import useObserver from "./useObserver";
import { StyledSideScrollerItem } from "./styles";

const Item = ({ onVisible, onHidden, scroller, children, setCardWidth }) => {
  const ref = useRef(null);
  const observer = useObserver(ref, {
    root: scroller.current,
    threshold: 0.35,
  });

  const setSize = useCallback(() => {
    setCardWidth(ref.current.clientWidth + 20);
  }, [setCardWidth]);

  React.useEffect(() => {
    if (!ref.current) return;
    setSize();
  }, [setSize]);

  React.useEffect(() => {
    window.addEventListener("resize", setSize);
    return () => window.removeEventListener("resize", setSize);
  }, [setSize]);

  React.useEffect(() => {
    if (observer) {
      onVisible();
    } else {
      onHidden();
    }
  }, [onVisible, onHidden, observer]);

  return <StyledSideScrollerItem ref={ref}>{children}</StyledSideScrollerItem>;
};

export default Item;
