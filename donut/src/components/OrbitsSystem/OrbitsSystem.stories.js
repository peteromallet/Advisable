import React, { useState } from "react";
import { Box } from "@advisable/donut";
import { withKnobs } from "@storybook/addon-knobs";
import OrbitsSystem, { Orbit } from "./Second";
import OrbitsSystemMotion, { Orbit as OrbitMotion } from "./First";

export default {
  title: "Content/OrbitsSystem",
  decorators: [withKnobs],
};

export const Circle = () => {
  const [state, setState] = useState(null);
  return (
    <div>
      <button onClick={() => setState((s) => !s)}>change</button>
      <Box height="100vh" bg="neutral50" position="relative">
        <OrbitsSystem
          increment={200}
          x={state ? -825 : -895}
          y={state ? 722 : 42}
          fill="transparent"
          align={state ? "right" : null}
          stroke={state ? "#E1E1E4" : "#1E42C2"}
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
          <Orbit
            fill={state ? "transparent" : "#234EE4"}
            stroke={state ? "#E1E1E4" : "#1E42C2"}
          >
            {(path) => (
              <circle r="50" fill="black">
                <animateMotion dur="30s" repeatCount="indefinite" path={path} />
              </circle>
            )}
          </Orbit>
          <Orbit stroke="#E1E1E4" />
          <Orbit stroke="#E1E1E4" />
          <Orbit stroke="#E1E1E4" />
          <Orbit stroke="#E1E1E4" />
          <Orbit stroke="#E1E1E4" />
          <Orbit stroke="#E1E1E4" />
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

export const CircleMotion = () => {
  const [state, setState] = useState(null);
  return (
    <div>
      <button onClick={() => setState((s) => !s)}>change</button>
      <Box height="100vh" bg="neutral50" position="relative">
        <OrbitsSystemMotion
          increment={200}
          x={state ? -825 : -895}
          y={state ? 722 : 42}
          fill="transparent"
          align={state ? "right" : null}
          stroke={state ? "#E1E1E4" : "#1E42C2"}
          width={"100%"}
          height={"100%"}
          layout
        >
          <OrbitMotion />
          <OrbitMotion />
          <OrbitMotion />
          <OrbitMotion />
          <OrbitMotion />
          <OrbitMotion />
          <OrbitMotion />
          <OrbitMotion
            fill={state ? "transparent" : "#234EE4"}
            stroke={state ? "#E1E1E4" : "#1E42C2"}
          />
          <OrbitMotion stroke="#E1E1E4" />
          <OrbitMotion stroke="#E1E1E4" />
          <OrbitMotion stroke="#E1E1E4" />
          <OrbitMotion stroke="#E1E1E4" />
          <OrbitMotion stroke="#E1E1E4" />
          <OrbitMotion stroke="#E1E1E4" />
        </OrbitsSystemMotion>
      </Box>
    </div>
  );
};
