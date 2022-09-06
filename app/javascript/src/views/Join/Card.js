import React from "react";
import { motion } from "framer-motion";

const cardAnimations = {
  enter: {
    x: 80,
    y: 0,
    opacity: 0,
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
  },
  exit: {
    x: -80,
    y: 0,
    opacity: 0,
    zIndex: 1,
    transition: { duration: 0.2 },
  },
};

export default function Card({ children }) {
  return (
    <motion.div
      className="bg-white overflow-hidden inline-block rounded-xl shadow-xl w-full sm:w-[580px]"
      variants={cardAnimations}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
