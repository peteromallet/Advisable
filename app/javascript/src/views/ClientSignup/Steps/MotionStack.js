import { Children } from "react";
import PropTypes from "prop-types";
import { Box } from "@advisable/donut";
import { motion } from "framer-motion";

const container = {
  initial: {
    transition: {},
  },
  show: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const item = {
  initial: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0, transition: { duration: 0.1 } },
};

function MotionStack({ children, ...props }) {
  const newChildren = Children.map(children, (child, index) => {
    if (!child) return child;
    if (child.props.ignore) return child;
    return (
      <motion.li key={index} variants={item}>
        {child}
      </motion.li>
    );
  });
  return (
    <Box
      {...props}
      as={motion.ul}
      variants={container}
      initial="initial"
      animate="show"
      exit="exit"
    >
      {newChildren}
    </Box>
  );
}

MotionStack.propTypes = {
  children: PropTypes.node,
  disable: PropTypes.bool,
};

export default MotionStack;
