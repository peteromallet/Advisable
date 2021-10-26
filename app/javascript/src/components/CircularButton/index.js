import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { variant } from "styled-system";
import { theme } from "@advisable/donut";

const StyledCircularButtonIcon = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  svg {
    z-index: 2;
    position: relative;
  }
`;

const StyledCircularButtonBackground = styled(motion.div)`
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  background: ${theme.colors.neutral100};
`;

const StyledCircularButtonLabel = styled.span`
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
`;

const size = variant({
  prop: "size",
  variants: {
    sm: {
      [StyledCircularButtonIcon]: {
        width: "36px",
        height: "36px",
        svg: {
          width: "20px",
        },
      },
    },
    md: {
      [StyledCircularButtonIcon]: {
        width: "40px",
        height: "40px",
        svg: {
          width: "20px",
        },
      },
    },
    lg: {
      [StyledCircularButtonIcon]: {
        width: "52px",
        height: "52px",
        svg: {
          width: "24px",
        },
      },
    },
    xl: {
      [StyledCircularButtonIcon]: {
        width: "64px",
        height: "64px",
        svg: {
          width: "24px",
        },
      },
    },
  },
});

const StyledCircularButton = styled(motion.button)`
  ${size};
  border: none;
  display: flex;
  outline: none;
  cursor: pointer;
  appearance: none;
  align-items: center;
  flex-direction: column;
  background: transparent;
  justify-content: center;
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

export default React.forwardRef(function CircularButton(
  { icon, bg, color, onClick, size, label, ...props },
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
    <StyledCircularButton
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
      <StyledCircularButtonIcon>
        {icon}
        <StyledCircularButtonBackground
          bg={bg}
          variants={circleVariants}
          transition={spring}
          initial={backgroundAnimation}
          animate={backgroundAnimation}
        />
      </StyledCircularButtonIcon>
      {label && <StyledCircularButtonLabel>{label}</StyledCircularButtonLabel>}
    </StyledCircularButton>
  );
});
