import React from "react";
import { Box } from "@advisable/donut";

export default function NavigationMenu({ children, ...props }) {
  return <Box {...props}>{children}</Box>;
}
