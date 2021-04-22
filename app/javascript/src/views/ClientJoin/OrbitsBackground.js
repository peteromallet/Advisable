import React from "react";
import { Orbit, OrbitsSystem, theme } from "@advisable/donut";

const getCoords = (step) => {
  switch (step) {
    case 0:
      return {
        y: { _: -1340, xlUp: 600 },
        x: { _: -140, sUp: 250, xlUp: -800 },
        offsetY: { _: -30, xlUp: 70 },
        increment: { _: 220, xlUp: 200 },
      };
    case 1:
      return {
        y: { _: -700, xlUp: 265 },
        x: { _: 140, sUp: 550, xlUp: -820 },
        offsetY: { _: 70, xlUp: -30 },
        increment: { _: 210, xlUp: 220 },
      };
    default:
      return { y: 45, x: -895 };
  }
};

function OrbitsBackground({ step }) {
  const coords = getCoords(step);
  const viewBox = { xlUp: "0 0 1420 1420" };
  const preserveAspectRatio = "xMidYMin slice";

  return (
    <OrbitsSystem
      {...coords}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      fill="transparent"
      stroke={theme.colors.neutral200}
      transition={{ duration: 1 }}
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
