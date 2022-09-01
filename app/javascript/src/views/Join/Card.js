import React from "react";
import { useBreakpoint } from "@advisable/donut";
import { motion } from "framer-motion";

const cardAnimations = {
  enter: ({ largeScreen }) => {
    return {
      x: largeScreen ? 80 : 0,
      y: largeScreen ? 0 : 80,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
  },
  exit: ({ largeScreen }) => {
    return {
      x: largeScreen ? -80 : 0,
      y: largeScreen ? 0 : -80,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.3 },
    };
  },
};

export default function Card({ children }) {
  const largeScreen = useBreakpoint("lUp");

  return (
    <motion.div
      className="bg-white inline-block p-12 rounded-xl shadow-xl"
      custom={{ largeScreen }}
      variants={cardAnimations}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
