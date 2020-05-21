import React from "react";
import { motion } from "framer-motion";
import { StyledProgress, StyledProgressBar } from "./styles";

function Progress({ value, ...props }) {
  return (
    <StyledProgress {...props}>
      <StyledProgressBar
        as={motion.div}
        initial={{
          width: 0,
        }}
        animate={{
          width: `${value}%`,
        }}
      />
    </StyledProgress>
  );
}

Progress.defaultProps = {
  value: 0,
  size: "md",
  color: "blue",
};

export default Progress;
