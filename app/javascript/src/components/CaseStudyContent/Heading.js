import React from "react";
import { Text } from "@advisable/donut";

const SIZES = {
  h1: {
    fontWeight: 600,
    fontSize: "28px",
    lineHeight: "32px",
    letterSpacing: "-0.03rem",
    paddingTop: 4,
    paddingBottom: 6,
  },
  h2: {
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "-0.03rem",
    paddingTop: 4,
    paddingBottom: 4,
  },
};

export default function CaseStudyHeading({ size, text }) {
  const sizeProps = SIZES[size] || {};
  return (
    <Text color="neutral900" {...sizeProps}>
      {text}
    </Text>
  );
}
