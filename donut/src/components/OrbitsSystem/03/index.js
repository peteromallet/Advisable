import { motion } from "framer-motion";
import useChildInjection from "@advisable/donut/hooks/useChildInjection";
import React from "react";

function OrbitsSystem({ children, increment, x, y, ...props }) {
  const items = useChildInjection(children, (child, index) => {
    const numOfOrbits = children.length;
    const order = index + 1;
    const reverseOrder = numOfOrbits - order;
    const radius = increment * order;
    const maxRadius = increment * numOfOrbits;
    const offsetX = child.props.offsetX || props.offsetX || "0%";
    const offsetY = child.props.offsetY || props.offsetY || "0%";
    const unitX = offsetX.replace(/[0-9]|-/g, "");
    const unitY = offsetY.replace(/[0-9]|-/g, "");
    const xFactor = unitX === "%" ? parseInt(offsetX) / 100 : 0;
    const yFactor = unitY === "%" ? parseInt(offsetY) / 100 : 0;
    const xShift = unitX === "px" ? parseInt(offsetX) * reverseOrder : 0;
    const yShift = unitY === "px" ? parseInt(offsetY) * reverseOrder : 0;
    const cx = x + maxRadius * xFactor + radius * -xFactor + xShift;
    const cy = y + maxRadius * yFactor + radius * -yFactor + yShift;

    return {
      ...props,
      index,
      radius: increment * (index + 1),
      cx,
      cy,
      ...child.props,
    };
  }).reverse();

  return (
    <motion.svg width="100%" height="100%">
      {items}
    </motion.svg>
  );
}

export * from "./Orbit";
export default OrbitsSystem;
