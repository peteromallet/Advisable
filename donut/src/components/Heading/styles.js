import styled from "styled-components";
import { variant, display, space, color, typography } from "styled-system";

const headingSize = variant({
  prop: "$size",
  variants: {
    "5xl": {
      fontSize: "5xl",
      fontWeight: 600,
      lineHeight: "32px",
      letterSpacing: "-0.04rem",
    },
    "4xl": {
      fontSize: "4xl",
      fontWeight: 600,
      lineHeight: "28px",
      letterSpacing: "-0.04rem",
    },
    "3xl": {
      fontSize: "3xl",
      fontWeight: 600,
      lineHeight: "24px",
      letterSpacing: "-0.03rem",
    },
    "2xl": {
      fontSize: "2xl",
      fontWeight: 650,
      lineHeight: "24px",
      letterSpacing: "-0.02rem",
    },
    xl: {
      fontSize: "xl",
      fontWeight: 650,
      lineHeight: "20px",
      letterSpacing: "-0.02rem",
    },
    lg: {
      fontSize: "lg",
      fontWeight: 650,
      lineHeight: "20px",
      letterSpacing: "-0.02rem",
    },
  },
});

export const StyledHeading = styled.h2(
  headingSize,
  space,
  color,
  display,
  typography,
);
