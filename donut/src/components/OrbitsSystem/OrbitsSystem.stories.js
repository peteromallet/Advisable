import React, { useState } from "react";
import { Box, Card, Text, Paragraph, Button } from "@advisable/donut";
import OrbitsSystem, { Orbit } from ".";
import SharedOrbitsProvider from "./SharedOrbitsProvider";

export default {
  title: "Content/OrbitsSystem",
};

function FirstPage({ setPage }) {
  return (
    <Box height="100vh" width="100%" position="relative">
      <OrbitsSystem
        startSize={400}
        increment={200}
        x={-900}
        y={0}
        stroke="#C2C2C2"
        offsetX={0}
        offsetY={0}
        transition={{ duration: 1 }}
      >
        <Orbit stroke="#211F88" />
        <Orbit stroke="#211F88" />
        <Orbit stroke="#211F88" />
        <Orbit stroke="#211F88" />
        <Orbit stroke="#211F88" />
        <Orbit fill="#234EE4" stroke="transparent" />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
      </OrbitsSystem>
      <Box py="2xl" zIndex={2} position="relative">
        <Card padding="xl" width={500} marginX="auto">
          <Text fontSize="3xl" fontWeight="medium" marginBottom="sm">
            Transition between different components
          </Text>
          <Paragraph marginBottom="lg">
            Some times you might want to transition from one orbit system to a
            completely different one.
          </Paragraph>
          <Button variant="dark" onClick={() => setPage("SECOND")}>
            Next Page
          </Button>
        </Card>
      </Box>
    </Box>
  );
}

function SecondPage({ setPage }) {
  return (
    <Box height="100vh" width="100%" position="relative">
      <OrbitsSystem
        increment={500}
        x={-1400}
        y={400}
        stroke="#C2C2C2"
        offsetX={100}
        transition={{ duration: 1 }}
      >
        <Orbit stroke="#5265A8" />
        <Orbit stroke="#5265A8" />
        <Orbit stroke="#5265A8" />
        <Orbit stroke="#5265A8" />
        <Orbit stroke="#5265A8" />
        <Orbit fill="#132B7D" stroke="transparent" />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
      </OrbitsSystem>
      <Box py="2xl" zIndex={2} position="relative">
        <Card padding="xl" width={500} marginX="auto">
          <Text fontSize="3xl" fontWeight="medium" marginBottom="sm">
            This is a completely different component!
          </Text>
          <Paragraph marginBottom="lg">But the orbits still animate.</Paragraph>
          <img src="https://media1.giphy.com/media/3o7TKP9ln2Dr6ze6f6/giphy.gif" />
          <Button mt="xl" variant="dark" onClick={() => setPage("FIRST")}>
            Go Back
          </Button>
        </Card>
      </Box>
    </Box>
  );
}

export function SwitchComponentsWithSharedOrbitsProvider() {
  const [page, setPage] = React.useState("FIRST");

  return (
    <SharedOrbitsProvider>
      {page === "FIRST" ? (
        <FirstPage setPage={setPage} />
      ) : (
        <SecondPage setPage={setPage} />
      )}
    </SharedOrbitsProvider>
  );
}

function PropForm({ values, setValues }) {
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card padding="lg">
      <Box display="flex" alignItems="center">
        <label style={{ width: 100 }}>increment</label>
        <input
          type="range"
          min="100"
          max="400"
          step="10"
          name="increment"
          value={values.increment}
          onChange={handleChange}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <label style={{ width: 100 }}>x</label>
        <input
          type="range"
          min="-2000"
          max="1000"
          name="x"
          step="10"
          value={values.x}
          onChange={handleChange}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <label style={{ width: 100 }}>y</label>
        <input
          type="range"
          min="-2000"
          max="1000"
          name="y"
          step="10"
          value={values.y}
          onChange={handleChange}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <label style={{ width: 100 }}>offsetX</label>
        <input
          type="range"
          min={`-${values.increment}`}
          max={`${values.increment}`}
          name="offsetX"
          step="10"
          value={values.offsetX}
          onChange={handleChange}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <label style={{ width: 100 }}>offsetY</label>
        <input
          type="range"
          min={`-${values.increment}`}
          max={`${values.increment}`}
          name="offsetY"
          step="10"
          value={values.offsetY}
          onChange={handleChange}
        />
      </Box>
    </Card>
  );
}

export function SwitchState() {
  const [props, setProps] = useState({
    increment: 200,
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
  });

  return (
    <Box height="100vh" width="100%">
      <Box position="relative" zIndex={2} width={300}>
        <PropForm values={props} setValues={setProps} />
      </Box>
      <OrbitsSystem {...props} stroke="#C2C2C2" transition={{ duration: 0.3 }}>
        <Orbit stroke="#211F88" />
        <Orbit stroke="#211F88" />
        <Orbit stroke="#211F88" />
        <Orbit stroke="#211F88" />
        <Orbit stroke="#211F88" />
        <Orbit fill="#234EE4" stroke="transparent" />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
        <Orbit />
      </OrbitsSystem>
    </Box>
  );
}
