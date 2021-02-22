import React from "react";
import { Orbit, OrbitsSystem, Box } from "@advisable/donut";
import { Colors } from "@guild/views/Events/components/EventsList/Colors";

export default function OrbitsBackground({
  color = "blue",
  orbits = 3,
  ...props
}) {
  return (
    <Box
      display="flex"
      width="100%"
      position="relative"
      overflow="hidden"
      {...props}
    >
      <OrbitsSystem increment={120} x={0} y={-50} offsetX={-100}>
        {[...Array(orbits)].map((_, idx) => (
          <Orbit key={idx} {...Colors[color]} />
        ))}
      </OrbitsSystem>
    </Box>
  );
}
