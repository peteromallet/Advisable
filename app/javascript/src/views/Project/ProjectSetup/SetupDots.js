import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Box, Circle } from "@advisable/donut";

function Dot({ path }) {
  const location = useLocation();
  const active = matchPath(location.pathname, { path });

  return <Circle size="8px" mx="2px" bg={active ? "blue600" : "neutral200"} />;
}

export default function SetupDots(props) {
  return (
    <Box display="flex" {...props}>
      <Dot path="/projects/:id/setup/skills" />
      <Dot path="/projects/:id/setup/primary_skill" />
      <Dot path="/projects/:id/setup/experience" />
      <Dot path="/projects/:id/setup/location" />
      <Dot path="/projects/:id/setup/characteristics" />
      <Dot path="/projects/:id/setup/required_characteristics" />
      <Dot path="/projects/:id/setup/description" />
      <Dot path="/projects/:id/setup/likely_to_hire" />
      <Dot path="/projects/:id/setup/publish" />
    </Box>
  );
}
