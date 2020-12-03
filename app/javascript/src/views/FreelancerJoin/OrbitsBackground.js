import React from "react";
import { Orbit, OrbitsSystem, theme } from "@advisable/donut";

const getCoords = (step) => {
  switch (step) {
    case 0:
      return {
        y: { _: -1000, xlUp: 45 },
        x: { _: -140, sUp: 250, xlUp: -825 },
      };
    case 1:
      return {
        y: { _: -1100, xlUp: 725 },
        x: { _: -140, sUp: 350, xlUp: -825 },
      };
    case 2:
      return {
        y: { _: -1170, xlUp: 1245 },
        x: { _: -140, sUp: 380, xlUp: -525 },
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
