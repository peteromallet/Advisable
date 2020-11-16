import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import renderCircle from "../renderCircle";

export function Orbit({
  index,
  radius,
  cx,
  cy,
  stroke,
  fill,
  strokeWidth,
  children,
  ...props
}) {
  const circle = useMemo(() => renderCircle(radius, 3, cx, cy), [
    cx,
    cy,
    radius,
  ]);

  const pathRef = useRef(null);
  const fillRef = useRef(null);
  const strokeRef = useRef(null);
  const [pathQueue, setPathQueue] = useState([circle]);
  const [fillQueue, setFillQueue] = useState([fill]);
  const [strokeQueue, setStrokeQueue] = useState([stroke]);
  useEffect(() => {
    circle !== pathQueue[0] && setPathQueue([circle, ...pathQueue]);
    circle !== pathQueue[0] && pathRef?.current?.beginElement();
    fill !== fillQueue[0] && setFillQueue([fill, ...fillQueue]);
    fill !== fillQueue[0] && fillRef?.current?.beginElement();
    stroke !== strokeQueue[0] && setStrokeQueue([stroke, ...strokeQueue]);
    stroke !== strokeQueue[0] && strokeRef?.current?.beginElement();
  }, [circle, fill, fillQueue, pathQueue, stroke, strokeQueue]);

  const animateAttributes = {
    fill: "freeze",
    dur: "1.2s",
    repeatCount: "1",
    calcMode: "spline",
    keyTimes: "0; 1",
    keySplines: ".75, 0, .25, 1;",
    restart: "always",
  };

  return (
    <>
      <motion.path
        layout
        key={index}
        id={`orbit-path-${index}`}
        d={pathQueue[0]}
        stroke={stroke}
        fill={fill}
        strokeWidth={strokeWidth}
        {...props}
      >
        <animate
          {...animateAttributes}
          ref={pathRef}
          attributeName="d"
          from={pathQueue[1]}
          to={pathQueue[0]}
        />
        <animate
          {...animateAttributes}
          ref={fillRef}
          attributeName="fill"
          from={fillQueue[1]}
          to={fillQueue[0]}
        />
        <animate
          {...animateAttributes}
          ref={strokeRef}
          attributeName="stroke"
          from={strokeQueue[1]}
          to={strokeQueue[0]}
        />
      </motion.path>
      {children && children(pathQueue[0])}
    </>
  );
  // return (
  //   <circle
  //     cx={cx}
  //     cy={cy}
  //     r={radius}
  //     stroke={stroke}
  //     fill={fill}
  //     strokeWidth={strokeWidth}
  //   />
  // );
}

export default Orbit;
