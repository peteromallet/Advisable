import React, { useMemo } from "react";
import { motion } from "framer-motion";
import composeStyles from "src/utilities/composeStyles";

function randomValue(min, max) {
  return Math.random() * (max - min) + min;
}

const diamondClasses = composeStyles({
  base: "diamond-grid-item",
  variants: {
    outlined: `diamond-grid-item--outlined`,
  },
});

function Diamond({ outlined }) {
  const initial = useMemo(() => {
    return {
      opacity: 0,
      x: randomValue(-20, 20),
      y: randomValue(-20, 20),
      scale: randomValue(0.2, 0.5),
      rotate: randomValue(10, 90),
    };
  }, []);

  const duration = randomValue(1, 2);
  const delay = randomValue(0, 0.75);

  return (
    <motion.div
      className={diamondClasses({ outlined })}
      initial={initial}
      animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
      transition={{ duration, delay }}
    />
  );
}

const diamonGridClasses = composeStyles({
  base: `diamond-grid`,
});

function DiamondGridItem({ variant }) {
  if (variant === "solid") return <Diamond />;
  if (variant === "outlined") return <Diamond outlined />;

  return <div className="diamond-grid-space" />;
}

export default function DiamondGrid({ grid, className }) {
  const columns = grid[0].length;
  const items = grid.flat();

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      className={diamonGridClasses({ className })}
    >
      {items.map((item, index) => (
        <DiamondGridItem key={index} variant={item} />
      ))}
    </div>
  );
}
