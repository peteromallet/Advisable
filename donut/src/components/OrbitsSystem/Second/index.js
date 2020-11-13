import { motion } from "framer-motion";
import useChildInjection from "@advisable/donut/hooks/useChildInjection";
import React from "react";

function OrbitsSystem({
  children,
  increment,
  x,
  y,
  width,
  height,
  align,
  ...props
}) {
  const items = useChildInjection(children, (child, index) => {
    const numOfOrbits = children.length;
    const radius = increment * (index + 1);
    const maxRadius = increment * numOfOrbits;
    const xFactor = (align === "left" && -1) || (align === "right" && 1) || 0;
    const yFactor = (align === "top" && -1) || (align === "bottom" && 1) || 0;
    const cx = x + maxRadius * xFactor + radius * -xFactor;
    const cy = y + maxRadius * yFactor + radius * -yFactor;
    return {
      ...props,
      index,
      numOfOrbits,
      align,
      radius,
      cx,
      cy,
      ...child.props,
    };
  }).reverse();

  return (
    <motion.svg
      style={{ position: "absolute", top: "0", left: "0" }}
      initial={{ width, height }}
      animate={{ width, height }}
    >
      {items}
    </motion.svg>
  );
}

export * from "./Orbit";
export default OrbitsSystem;
