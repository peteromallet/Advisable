import React from "react";
import { motion } from "framer-motion";
import { Box, Card, useBreakpoint } from "@advisable/donut";

export const cardAnimations = {
  enter: ({ largeScreen, forwards }) => {
    return {
      y: largeScreen ? (forwards ? -30 : 30) : forwards ? 10 : -10,
      x: 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    y: 0,
    zIndex: 1,
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: ({ largeScreen, forwards }) => {
    return {
      y: largeScreen ? (forwards ? 80 : -80) : forwards ? -40 : 40,
      x: 0,
      opacity: 0,
      zIndex: 1,
      transition: { duration: 0.4 },
    };
  },
};

export default function MotionBox({ children, forwards, ...props }) {
  const largeScreen = useBreakpoint("lUp");
  return (
    <Box
      as={motion.div}
      custom={{ largeScreen, forwards }}
      variants={cardAnimations}
      initial="enter"
      animate="center"
      exit="exit"
      zIndex={2}
      width="100%"
      position="relative"
      gridArea="card"
      alignSelf={{ _: "start", xl: "center" }}
      {...props}
    >
      {children && (
        <Card
          padding={[5, 10]}
          maxWidth={640}
          width={{ xl: 640 }}
          borderRadius={8}
        >
          {children}
        </Card>
      )}
    </Box>
  );
}
