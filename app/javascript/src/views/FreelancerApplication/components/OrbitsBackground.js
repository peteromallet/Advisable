import React from "react";
import { Orbit, OrbitsSystem, Box } from "@advisable/donut";

export default function OrbitsBackground() {
  return (
    <Box height="100vh" width="100%" position="absolute" zIndex="-1">
      <OrbitsSystem
        startSize={400}
        increment={200}
        x={-900}
        y={-640}
        stroke="#E9EDF5"
        strokeWidth={2}
        offsetX={0}
        offsetY={-80}
        transition={{ duration: 1 }}
      >
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
      </OrbitsSystem>
    </Box>
  );
}
