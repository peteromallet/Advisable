import React from "react";
import { motion } from "framer-motion";
import { Box, Card, useBreakpoint } from "@advisable/donut";
import { transitionVariants } from "../transitionVariants";

export default function MotionCard({ children, forwards, ...props }) {
  const largeScreen = useBreakpoint("xlUp");
  return (
    <Box
      as={motion.div}
      custom={{ largeScreen, forwards }}
      variants={transitionVariants}
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
          elevation="l"
        >
          {children}
        </Card>
      )}
    </Box>
  );
}
