import React from "react";
import css from "@styled-system/css";
import { motion } from "framer-motion";
import styled from "styled-components";
import { variant } from "styled-system";

const StyledCircularButtonIcon = styled.div(
  css({
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    svg: {
      zIndex: 2,
      position: "relative",
    },
  }),
);

const StyledCircularButtonLabel = styled.span(
  css({
    marginTop: 1,
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "-0.01em",
  }),
);

const StyledCircularButtonBackground = styled.div(
  css({
    zIndex: 1,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    position: "absolute",
  }),
);

const size = variant({
  prop: "$size",
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

const color = variant({
  prop: "$color",
  variants: {
    neutral: {
      color: "neutral700",
      [StyledCircularButtonBackground]: {
        bg: "neutral100",
      },
      "&:hover": {
        color: "neutral900",
        [StyledCircularButtonBackground]: {
          bg: "neutral200",
        },
      },
    },

    blue: {
      color: "blue500",
      [StyledCircularButtonBackground]: {
        bg: "blue100",
      },
      "&:hover": {
        color: "blue700",
      },
    },
  },
});

const StyledCircularButton = styled.button(
  size,
  color,
  css({
    padding: 0,
    margin: 0,
    border: "none",
    display: "flex",
    outline: "none",
    appearance: "none",
    position: "relative",
    alignItems: "center",
    background: "transparent",
    justifyContent: "center",
    flexDirection: "column",
  }),
);

const circleVariants = {
  default: {
    scale: 1,
  },
  hover: {
    scale: 1.08,
  },
  pressed: {
    scale: 1,
  },
};

const spring = {
  type: "spring",
  damping: 10,
  stiffness: 400,
};

const CircularButton = React.forwardRef(function CircularButton(
  { icon, onClick, size = "md", label, color = "neutral", ...props },
  ref,
) {
  return (
    <StyledCircularButton
      ref={ref}
      $size={size}
      $color={color}
      onClick={onClick}
      whileHover="hover"
      whileTap="pressed"
      as={motion.button}
      {...props}
    >
      <StyledCircularButtonIcon>
        {React.createElement(icon)}
        <StyledCircularButtonBackground
          as={motion.div}
          transition={spring}
          variants={circleVariants}
        />
      </StyledCircularButtonIcon>
      {label && <StyledCircularButtonLabel>{label}</StyledCircularButtonLabel>}
    </StyledCircularButton>
  );
});

export default CircularButton;
