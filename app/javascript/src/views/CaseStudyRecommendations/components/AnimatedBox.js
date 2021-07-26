import React from "react";
import { Box } from "@advisable/donut";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const cardAnimations = {
  enter: ({ forwards }) => {
    return {
      x: forwards ? 80 : -80,
      y: 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
  },
  exit: ({ forwards }) => {
    return {
      y: 0,
      x: forwards ? -80 : 80,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.3 },
    };
  },
};

const AnimatedCard = (props) => {
  const history = useHistory();
  const forwards = history.action === "PUSH";

  return (
    <Box
      as={motion.div}
      variants={cardAnimations}
      custom={{ forwards }}
      initial="enter"
      animate="center"
      exit="exit"
      {...props}
    />
  );
};
export default AnimatedCard;
