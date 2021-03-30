import React, { useEffect } from "react";
import { Card, useBreakpoint, useTheme } from "@advisable/donut";
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
  const theme = useTheme();
  const history = useHistory();
  const largeScreen = useBreakpoint("lUp");
  const forwards = history.action === "PUSH";
  const isMobile = useBreakpoint("s");

  useEffect(() => {
    theme.updateTheme({
      background: isMobile ? "white" : "default",
    });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <Card
      as={motion.div}
      variants={cardAnimations}
      custom={{ largeScreen, forwards }}
      initial="enter"
      animate="center"
      exit="exit"
      px={[0, 10]}
      pt={[0, 10]}
      pb={[0, 12]}
      elevation={["none", "m"]}
      variant={["transparent", "default"]}
      borderRadius="12px"
      {...props}
    />
  );
};
export default AnimatedCard;
