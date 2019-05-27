import * as React from "react";

const LineClamp = ({ children, maxHeight, character = "…" }) => {
  const ref = React.useRef(null);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(Boolean(children) ? children.length : 0);

  if (!Boolean(children)) return null;

  const midPoint = Math.floor((min + max) / 2);

  const handleResize = () => {
    setMin(0);
    setMax(children.length);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (min >= max) return;

    if (ref.current.offsetHeight < maxHeight) {
      setMin(midPoint);
    } else {
      setMax(midPoint);
    }
  }, [midPoint]);

  const text = `${children.slice(0, midPoint)}${character}`;

  return <span ref={ref}>{text}</span>;
};

export default LineClamp;
