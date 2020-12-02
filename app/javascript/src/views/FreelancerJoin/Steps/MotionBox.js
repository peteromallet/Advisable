import React from "react";
import { motion } from "framer-motion";
import { Box, Card, useBreakpoint } from "@advisable/donut";

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

export default function MotionBox({ children, forwards, ...props }) {
  const largeScreen = useBreakpoint("lUp");
  return (
    <Box
      as={motion.div}
      custom={{ largeScreen, forwards }}
      transition={{ duration: 0.4 }}
      variants={cardAnimations}
      initial="enter"
      animate="center"
      exit="exit"
      zIndex={2}
      position="relative"
      // my="auto"
      // mx={[0, "auto"]}
      // ml={{ _: "auto", xl: "5.75rem" }}
      // mr={{ _: "auto", xl: 12 }}
      ml={{ _: "auto", xl: "8%" }}
      mr={{ _: "auto", xl: "3.8%" }}
      width={["100%", "auto"]}
      // pb={{ xl: 20 }}
      {...props}
    >
      <Card
        padding={[5, 10]}
        maxWidth={650}
        width="100%"
        marginX="auto"
        borderRadius="8px"
      >
        {children}
      </Card>
    </Box>
  );
}
