import React from "react";
import { Box } from "@advisable/donut";
import { AnimateSharedLayout } from "framer-motion";
import OrbitsSystem, { Orbit } from ".";

export default {
  title: "Content/OrbitsSystem-03",
};

function FirstPage({ setPage }) {
  return (
    <Box height="70vh" width="100%">
      <OrbitsSystem
        increment={80}
        x={80}
        y={80}
        fill="transparent"
        stroke="#E1E1E4"
        offsetX="0px"
        offsetY="0px"
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
      <button onClick={() => setPage("SECOND")}>Next</button>
    </Box>
  );
}

function SecondPage({ setPage }) {
  return (
    <Box height="70vh" width="100%">
      <OrbitsSystem
        increment={80}
        x={180}
        y={280}
        fill="transparent"
        stroke="#E1E1E4"
        offsetX="-10px"
        offsetY="30px"
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

export function FramerTest() {
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
