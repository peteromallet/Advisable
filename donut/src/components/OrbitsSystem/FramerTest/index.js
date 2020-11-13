import React from "react";
import { Box } from "@advisable/donut";
import { AnimateSharedLayout } from "framer-motion";
import OrbitsSystem, { Orbit } from "../Third";

function FirstPage({ setPage }) {
  return (
    <Box height="50vh" width="50vw">
      <OrbitsSystem
        increment={80}
        x={-20}
        y={50}
        fill="transparent"
        stroke="red"
        width="100%"
        height="100%"
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
      </OrbitsSystem>
      <button onClick={() => setPage("SECOND")}>Next</button>
    </Box>
  );
}

function SecondPage({ setPage }) {
  return (
    <Box height="50vh" width="50vw">
      <OrbitsSystem
        increment={80}
        x={600}
        y={60}
        fill="transparent"
        stroke="blue"
        width="100%"
        height="100%"
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
      </OrbitsSystem>
      <button onClick={() => setPage("FIRST")}>Back</button>
    </Box>
  );
}

export default function FramerTest() {
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
