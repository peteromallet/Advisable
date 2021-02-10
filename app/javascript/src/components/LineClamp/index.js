import React, { useCallback } from "react";

const LineClamp = ({ children, maxHeight, character = "…" }) => {
  const ref = React.useRef(null);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(children ? children.length : 0);

  const midPoint = Math.floor((min + max) / 2);

  const handleResize = useCallback(() => {
    setMin(0);
    setMax(children.length);
  }, [children]);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  React.useLayoutEffect(() => {
    if (min >= max) return;

    if (ref.current.offsetHeight < maxHeight) {
      setMin(midPoint);
    } else {
      setMax(midPoint);
    }
  }, [midPoint, max, maxHeight, min]);

  if (!children) return null;

  const text = `${children.slice(0, midPoint)}${character}`;

  return <span ref={ref}>{text}</span>;
};

export default LineClamp;
