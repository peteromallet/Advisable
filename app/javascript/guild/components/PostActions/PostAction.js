import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { theme } from "@advisable/donut";

const StyledPostAction = styled(motion.div)`
  width: 40px;
  height: 40px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.red500};

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

export default function PostAction({ icon, bg, color, onClick }) {
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
      color={color}
      onClick={onClick}
      whileHover="hover"
      whileTap="pressed"
      animate={colorAnimation}
      initial={colorAnimation}
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
}
