import React from "react";
import { motion } from "framer-motion";
import { Box, useBreakpoint } from "@advisable/donut";
import cardAnimations from "./framerVariant";

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
      {...props}
    >
      {children}
    </Box>
  );
}
