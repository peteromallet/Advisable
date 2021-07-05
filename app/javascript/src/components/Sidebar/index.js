import React from "react";
import { motion } from "framer-motion";
import { Card } from "@advisable/donut";

function Sidebar({ children, ...props }) {
  return (
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
  );
}

export default Sidebar;
