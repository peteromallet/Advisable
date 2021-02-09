import React from "react";
import { theme, OrbitsSystem, Orbit } from "@advisable/donut";

export default function Orbits(props) {
  return (
    <OrbitsSystem strokeWidth={2} stroke={theme.colors.neutral100} {...props}>
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
  );
}
