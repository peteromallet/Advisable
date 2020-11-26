import React from "react";
import { Orbit, OrbitsSystem, theme } from "@advisable/donut";

const getCoords = (step) => {
  switch (step) {
    case 0:
      return { y: 45, x: -895 };
    case 1:
      return { y: 725, x: -895 };
    case 2:
      return { y: 1245, x: -895 };
    default:
      return { y: 45, x: -895 };
  }
};

function OrbitsBackground({ step }) {
  const coords = getCoords(step);
  return (
    <OrbitsSystem
      {...coords}
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
