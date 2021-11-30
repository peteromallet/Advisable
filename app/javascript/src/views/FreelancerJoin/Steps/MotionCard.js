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
    >
      {children && (
        <Card
          paddingTop={[5, 10]}
          paddingX={[5, 12]}
          paddingBottom={[5, 12]}
          maxWidth={640}
          width={{ xl: 640 }}
          borderRadius="24px"
          elevation="l"
          {...props}
        >
          {children}
        </Card>
      )}
    </Box>
  );
}
