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
      layoutId={`orbit${index}`}
      key={index}
      d={renderCircle(radius, 3, cx, cy)}
      stroke={stroke}
      fill={fill}
      strokeWidth={strokeWidth}
      initial={{ fill, stroke }}
      animate={{ fill, stroke }}
      {...props}
    />
  );
}

export default Orbit;
