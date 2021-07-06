import React from "react";
import { motion } from "framer-motion";
import { Card, useBreakpoint } from "@advisable/donut";

function SidebarContainer({ children, ...props }) {
  const largeScreen = useBreakpoint("lUp");

  return largeScreen ? (
    <Card
      as={motion.div}
      initial={{ opacity: 0, left: -100 }}
      animate={{ opacity: 1, left: 0 }}
      transition={{ duration: 0.5 }}
      top="0"
      left="0"
      padding={6}
      width="300px"
      position="relative"
      height="calc(100vh - 60px)"
      borderRadius="0px"
      {...props}
    >
      {children}
    </Card>
  ) : null;
}

export default SidebarContainer;
