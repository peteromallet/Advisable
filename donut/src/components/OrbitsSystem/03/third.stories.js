import React from "react";
import { Box } from "@advisable/donut";
import { AnimateSharedLayout } from "framer-motion";
import OrbitsSystem, { Orbit } from ".";

export default {
  title: "Content/OrbitsSystem-03",
};

function FirstPage({ setPage }) {
  return (
    <Box height="50vh" width="50vw">
      <OrbitsSystem
        increment={15}
        x={60}
        y={60}
        fill="transparent"
        stroke="red"
        offsetX="10px"
        offsetY="10px"
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
        increment={15}
        x={180}
        y={280}
        fill="transparent"
        stroke="blue"
        offsetX="-10px"
        offsetY="10px"
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
