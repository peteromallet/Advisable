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
      transition: { duration: 0.2 },
    };
  },
};

export default function Card({ children }) {
  const largeScreen = useBreakpoint("lUp");

  return (
    <motion.div
      className="bg-white overflow-hidden inline-block rounded-xl shadow-xl w-full md:w-[580px]"
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
