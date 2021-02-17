import React from "react";
import { Card, useBreakpoint } from "@advisable/donut";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const cardAnimations = {
  enter: ({ largeScreen, forwards }) => {
    return {
      x: largeScreen ? 0 : forwards ? 80 : -80,
      y: largeScreen ? (forwards ? 80 : -80) : 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
  },
  exit: ({ largeScreen, forwards }) => {
    return {
      y: largeScreen ? (forwards ? -80 : 80) : 0,
      x: largeScreen ? 0 : forwards ? -80 : 80,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.3 },
    };
  },
};

const AnimatedCard = (props) => {
  const history = useHistory();
  const largeScreen = useBreakpoint("lUp");
  const forwards = history.action === "PUSH";

  return (
    <Card
      as={motion.div}
      variants={cardAnimations}
      custom={{ largeScreen, forwards }}
      initial="enter"
      animate="center"
      exit="exit"
      key="100"
      px={10}
      pt={12}
      pb={16}
      borderRadius="12px"
      {...props}
    />
  );
};

export default AnimatedCard;
