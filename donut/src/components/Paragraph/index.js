// Renders a paragraph of text. This is mostly a helper component that groups
// together common props for the Text component when rendering blocks of text.
import React, { forwardRef } from "react";
import Text from "../Text";

const SIZES = {
  "2xs": {
    fontSize: "2xs",
    lineHeight: "18px",
  },
  xs: {
    fontSize: "xs",
    lineHeight: "20px",
  },
  sm: {
    fontSize: "sm",
    lineHeight: "22px",
  },
  md: {
    fontSize: "md",
    lineHeight: "23px",
  },
  lg: {
    fontSize: "lg",
    lineHeight: "26px",
  },
};

const Paragraph = forwardRef(function Paragraph({ size, ...props }, ref) {
  const sizeProps = SIZES[size];
  return <Text {...sizeProps} {...props} ref={ref} />;
});

Paragraph.defaultProps = {
  color: "neutral800",
};

export default Paragraph;
