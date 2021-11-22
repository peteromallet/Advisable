import React from "react";
import { Heading } from "@advisable/donut";
import GradientHighlight from "src/components/GradientHighlight";

export default function Header({ children, ...props }) {
  return (
    <Heading as="h1" size="5xl" mb={2.5} {...props}>
      <GradientHighlight>{children}</GradientHighlight>
    </Heading>
  );
}
