import React from "react";
import { Orbit, OrbitsSystem, theme } from "@advisable/donut";

const getCoords = (step) => {
  switch (step) {
    case 0:
      return {
        y: { _: 2300, xlUp: 100 },
        x: { _: 680, sUp: 790, xlUp: 2340 },
        offsetY: { _: 30, xlUp: -70 },
        increment: { _: 220, xlUp: 200 },
      };
    case 1:
      return {
        y: { _: 1550, xlUp: 500 },
        x: { _: 400, sUp: 890, xlUp: 2385 },
        offsetY: { _: -70, xlUp: 10 },
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
      <Orbit
        stroke={theme.colors.blue200}
        strokeOpacity={0.2}
        strokeWidth={1.5}
      />
      <Orbit
        stroke={theme.colors.blue200}
        strokeOpacity={0.2}
        strokeWidth={1.5}
      />
      <Orbit
        stroke={theme.colors.blue200}
        strokeOpacity={0.2}
        strokeWidth={1.5}
      />
      <Orbit
        stroke={theme.colors.blue200}
        strokeOpacity={0.2}
        strokeWidth={1.5}
      />
      <Orbit
        stroke={theme.colors.blue200}
        strokeOpacity={0.2}
        strokeWidth={1.5}
      />
      <Orbit
        stroke={theme.colors.blue200}
        strokeOpacity={0.2}
        strokeWidth={1.5}
      />
      <Orbit
        stroke={theme.colors.blue200}
        strokeOpacity={0.2}
        strokeWidth={1.5}
      />
      <Orbit fill="url(#orbitGradient)" />
      <Orbit />
      <Orbit />
      <Orbit />
      <Orbit />
      <Orbit />
      <Orbit />
      <defs>
        <linearGradient
          id="orbitGradient"
          x1="100"
          y1="0"
          x2="0"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4234E3" />
          <stop offset="1" stopColor="#6F28D3" />
        </linearGradient>
      </defs>
    </OrbitsSystem>
  );
}

export default OrbitsBackground;
