import { motion } from "framer-motion";
import React from "react";
import renderCircle from "../renderCircle";

export function Orbit({
  index,
  radius,
  cx,
  cy,
  stroke,
  fill,
  strokeWidth,
  ...props
}) {
  return (
    <motion.path
      layout
      key={index}
      d={`${renderCircle(radius, 3, cx, cy)}`}
      // stroke={stroke}
      // fill={fill}
      strokeWidth={strokeWidth}
      initial={{ fill, stroke }}
      animate={{ fill, stroke }}
      {...props}
    />
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
