import React from "react";
import { Box } from "@advisable/donut";
import blue from "./orbits/blue.svg";
import cyan from "./orbits/cyan.svg";
import purple from "./orbits/purple.svg";
import orange from "./orbits/orange.svg";

const ORBITS = { purple, blue, orange, cyan };

export default function OrbitsBackground({ color = "blue", ...props }) {
  return (
    <Box
      display="flex"
      width="100%"
      position="relative"
      overflow="hidden"
      backgroundImage={`url(${ORBITS[color] || "blue"})`}
      backgroundPosition="center"
      backgroundSize="cover"
      {...props}
    />
  );
}
