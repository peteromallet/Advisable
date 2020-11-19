import React, { useState } from "react";
import { Box } from "@advisable/donut";
import { AnimateSharedLayout } from "framer-motion";
import OrbitsSystem, { Orbit } from "./OrbitsSystem";
import SharedStateProvider from "./SharedStateProvider";

export default {
  title: "Content/OrbitsSystem-04",
};

function FirstPage({ setPage }) {
  return (
    <Box height="70vh" width="100%">
      <OrbitsSystem
        increment={90}
        x={800}
        y={800}
        fill="transparent"
        stroke="#ff0000"
        offsetX={0}
        offsetY={0}
        transition={{ duration: 1 }}
      >
        <Orbit stroke="#00ff00" />
        <Orbit stroke="#00ff00" />
        <Orbit stroke="#00ff00" />
        <Orbit stroke="#00ff00" />
        <Orbit stroke="#00ff00" />
        <Orbit fill="#ff0000" />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
      </OrbitsSystem>
      <button onClick={() => setPage("SECOND")}>Nexttt</button>
    </Box>
  );
}

function SecondPage({ setPage }) {
  return (
    <Box height="70vh" width="100%">
      <OrbitsSystem
        increment={20}
        x={180}
        y={280}
        fill="transparent"
        stroke="#E1E1E4"
        offsetX={0}
        offsetY={0}
        transition={{ duration: 1 }}
      >
        <Orbit stroke="#1E42C2" />
        <Orbit stroke="#1E42C2" />
        <Orbit stroke="#1E42C2" />
        <Orbit stroke="#1E42C2" />
        <Orbit stroke="#1E42C2" />
        <Orbit fill="#234EE4" />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
      </OrbitsSystem>
      <button onClick={() => setPage("FIRST")}>Back</button>
    </Box>
  );
}

export function SwitchComponentsWithFramer() {
  const [page, setPage] = React.useState("FIRST");

  return (
    <AnimateSharedLayout>
      {page === "FIRST" ? (
        <FirstPage setPage={setPage} />
      ) : (
        <SecondPage setPage={setPage} />
      )}
    </AnimateSharedLayout>
  );
}

export function SwitchComponentsWithHistoryStack() {
  const [page, setPage] = React.useState("FIRST");

  return (
    <SharedStateProvider>
      {page === "FIRST" ? (
        <FirstPage setPage={setPage} />
      ) : (
        <SecondPage setPage={setPage} />
      )}
    </SharedStateProvider>
  );
}

export function SwitchState() {
  const [state, setState] = useState(false);
  return (
    <Box height="70vh" width="100%">
      <OrbitsSystem
        increment={state ? 80 : 10}
        x={state ? 800 : 100}
        y={state ? 100 : 100}
        fill={"transparent"}
        stroke={state ? "#FF0000" : "#E1E1E4"}
        offsetX={state ? 20 : 0}
        offsetY={state ? 20 : 0}
        transition={{ duration: 1 }}
      >
        <Orbit stroke="#1E42C2" />
        <Orbit stroke="#1E42C2" />
        <Orbit stroke="#1E42C2" />
        <Orbit stroke="#1E42C2" />
        <Orbit stroke="#1E42C2" />
        <Orbit fill={state ? "#00ff00" : "#234EE4"} />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
      </OrbitsSystem>
      <button onClick={() => setState((s) => !s)}>Switch</button>
    </Box>
  );
}
