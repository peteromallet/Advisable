import React from "react";
import { StyledCard, Box, OrbitsSystem, Orbit } from "@advisable/donut";
import styled from "styled-components";

const Card = styled(StyledCard)`
  position: relative;
  background: #fff9f5;
  overflow: hidden;
`;

function OrbitsBackground() {
  const viewBox = "0 0 250 250";
  const preserveAspectRatio = "xMidYMax meet";

  return (
    <OrbitsSystem
      x={-240}
      y={-60}
      offsetY={80}
      offsetX={-120}
      stroke="#F0E9E2"
      strokeWidth={2}
      increment={80}
      startSize={300}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
    >
      <Orbit />
      <Orbit />
      <Orbit />
    </OrbitsSystem>
  );
}

export default function PromptCard({ children, ...props }) {
  return (
    <Card elevation="l" borderRadius="12px" {...props}>
      <OrbitsBackground />
      <Box position="relative" p={8}>
        {children}
      </Box>
    </Card>
  );
}
