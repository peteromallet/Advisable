import React, { useMemo } from "react";
import { motion } from "framer-motion";

function randomBetween(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export default function GridHighlight({ offset, direction = "down" }) {
  const transition = useMemo(() => {
    return {
      delay: randomBetween(0, 8),
      duration: randomBetween(4, 8),
      ease: "linear",
      repeat: Infinity,
      repeatDelay: randomBetween(4, 10),
    };
  }, []);

  return (
    <motion.div
      data-direction={direction}
      className="grid-line-highlight"
      initial={{
        y: direction == "up" ? "var(--grid-area)" : 0,
      }}
      animate={{
        x: direction == "down" ? "var(--grid-area)" : 0,
        y: direction == "up" ? -100 : 0,
      }}
      transition={transition}
      style={{ "--offset": offset }}
    />
  );
}
