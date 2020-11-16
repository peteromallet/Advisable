import React, { useState } from "react";
import { Box } from "@advisable/donut";
import { withKnobs } from "@storybook/addon-knobs";
import OrbitsSystem, { Orbit } from ".";

export default {
  title: "Content/OrbitsSystem-02",
  decorators: [withKnobs],
};

export const Circle = () => {
  const [state, setState] = useState(null);
  return (
    <div>
      <button onClick={() => setState((s) => !s)}>change</button>
      <Box height="100vh" bg="neutral50" position="relative">
        <OrbitsSystem
          increment={state ? 10 : 200}
          x={state ? 100 : -895}
          y={state ? 100 : 42}
          fill="transparent"
          align={state ? "right" : null}
          stroke="red"
          width={"100%"}
          height={"100%"}
          layout
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
          <Orbit />
        </OrbitsSystem>
      </Box>
    </div>
  );
};

export const CircleSec = () => {
  const [state, setState] = useState(null);
  return (
    <div>
      <button onClick={() => setState((s) => !s)}>change</button>
      <Box height="100vh" bg="neutral50" position="relative">
        <OrbitsSystem
          increment={100}
          x={400}
          y={400}
          fill="transparent"
          align="top"
          stroke={state ? "#E1E1E4" : "#1E42C2"}
          width={"100%"}
          height={"100%"}
          layout
        >
          <Orbit />
          <Orbit />
          <Orbit />
          <Orbit
            fill={state ? "transparent" : "#234EE4"}
            stroke={state ? "#E1E1E4" : "#1E42C2"}
          ></Orbit>
          <Orbit stroke="#E1E1E4" />
        </OrbitsSystem>
      </Box>
    </div>
  );
};
