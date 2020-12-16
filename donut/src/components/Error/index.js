import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { StyledError } from "./styles";

const Error = ({ children, ...props }) => (
  <AnimatePresence>
    {children ? (
      <StyledError
        as={motion.div}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        {...props}
      >
        {children}
      </StyledError>
    ) : null}
  </AnimatePresence>
);

export default Error;
