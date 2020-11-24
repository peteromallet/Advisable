import React from "react";
import { Orbit, OrbitsSystem, theme } from "@advisable/donut";

function OrbitsBackground() {
  return (
    <OrbitsSystem
      x={-895}
      y={45}
      fill="transparent"
      stroke={theme.colors.neutral200}
      increment={200}
    >
      <Orbit stroke={theme.colors.blue600} />
      <Orbit stroke={theme.colors.blue600} />
      <Orbit stroke={theme.colors.blue600} />
      <Orbit stroke={theme.colors.blue600} />
      <Orbit stroke={theme.colors.blue600} />
      <Orbit stroke={theme.colors.blue600} />
      <Orbit stroke={theme.colors.blue600} />
      <Orbit fill={theme.colors.blue500} />
      <Orbit />
      <Orbit />
      <Orbit />
      <Orbit />
      <Orbit />
      <Orbit />
    </OrbitsSystem>
  );
}

export default OrbitsBackground;
