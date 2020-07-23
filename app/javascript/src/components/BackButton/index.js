import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { StyledBackButton } from "./styles";

const backVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
};

const arrowVariants = {
  initial: { x: 0, stroke: "#878AB4" },
  hover: {
    x: -2,
    stroke: "#1E234E",
  },
};

const lineVariants = {
  initial: {
    x: 0,
    pathLength: 0.8,
    stroke: "#878AB4",
  },
  hover: {
    x: 2,
    pathLength: 1,
    stroke: "#1E234E",
  },
};

export default function BackButton({ to, label = "Back", ...props }) {
  return (
    <StyledBackButton
      as={motion.div}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      <Link to={to} aria-label={label} />
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <motion.path
          d="M25 20H14"
          stroke="#878AB4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
        />
        <motion.path
          d="M20 15L15 20L20 25"
          stroke="#878AB4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={arrowVariants}
        />
      </svg>
    </StyledBackButton>
  );
}
