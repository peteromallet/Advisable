import { motion } from "framer-motion";
import useChildInjection from "@advisable/donut/hooks/useChildInjection";
import React from "react";

function OrbitsSystem({ children, increment, x, y, width, height, ...props }) {
  const items = useChildInjection(children, (child, index) => ({
    ...props,
    index,
    radius: increment * (index + 1),
    cx: x,
    cy: y,
    ...child.props,
  })).reverse();

  return (
    <motion.svg width={width} height={height}>
      {items}
    </motion.svg>
  );
}

export * from "./Orbit";
export default OrbitsSystem;
