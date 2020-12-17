import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { variant } from "styled-system";
import { theme } from "@advisable/donut";

const size = variant({
  prop: "size",
  variants: {
    md: {
      width: "40px",
      height: "40px",
    },
    lg: {
      width: "52px",
      height: "52px",
    },
    xl: {
      width: "64px",
      height: "64px",
    },
  },
});

const StyledPostAction = styled(motion.button)`
  ${size};

  border: none;
  display: flex;
  outline: none;
  appearance: none;
  position: relative;
  align-items: center;
  background: transparent;
  justify-content: center;

  svg {
    z-index: 2;
    width: 24px;
    height: 24px;
  }
`;

const StyledPostActionBackground = styled(motion.div)`
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  background: ${theme.colors.neutral100};
`;

const circleVariants = {
  default: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
  pressed: {
    scale: 0.9,
  },
};

const spring = {
  type: "spring",
  damping: 10,
  stiffness: 400,
};

export default React.forwardRef(function PostAction(
  { icon, bg, color, onClick, size, ...props },
  ref,
) {
  const colorAnimation = {
    color: theme.colors[color],
    transition: { duration: 0.3 },
  };

  const backgroundAnimation = {
    backgroundColor: theme.colors[bg],
    transition: { duration: 0.3 },
  };
  return (
    <StyledPostAction
      ref={ref}
      size={size || "md"}
      color={color}
      onClick={onClick}
      whileHover="hover"
      whileTap="pressed"
      animate={colorAnimation}
      initial={colorAnimation}
      {...props}
    >
      {icon}
      <StyledPostActionBackground
        bg={bg}
        variants={circleVariants}
        transition={spring}
        initial={backgroundAnimation}
        animate={backgroundAnimation}
      />
    </StyledPostAction>
  );
});
