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
      <Dot path="/jobs/:id/skills" />
      <Dot path="/jobs/:id/primary_skill" />
      <Dot path="/jobs/:id/experience" />
      <Dot path="/jobs/:id/location" />
      <Dot path="/jobs/:id/characteristics" />
      <Dot path="/jobs/:id/required_characteristics" />
      <Dot path="/jobs/:id/description" />
      <Dot path="/jobs/:id/likely_to_hire" />
      <Dot path="/jobs/:id/publish" />
    </Box>
  );
}
