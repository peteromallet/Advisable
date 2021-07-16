import React from "react";
import { StyledHeading } from "./styles";

export default function Heading({
  size = "4xl",
  color = "neutral900",
  ...props
}) {
  return <StyledHeading $size={size} color={color} {...props} />;
}
