import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Box, Circle } from "@advisable/donut";

function Dot({ paths = [] }) {
  const location = useLocation();
  const index = paths.findIndex((path) =>
    matchPath(location.pathname, { path }),
  );
  const active = index > -1;

  return <Circle mr="6px" size="8px" bg={active ? "blue600" : "neutral200"} />;
}

export default function SetupDots(props) {
  return (
    <Box display="flex" {...props}>
      <Dot
        paths={[
          "/jobs/:id/skills",
          "/jobs/:id/primary_skill",
          "/jobs/:id/experience",
        ]}
      />
      <Dot paths={["/jobs/:id/location"]} />
      <Dot
        paths={[
          "/jobs/:id/characteristics",
          "/jobs/:id/required_characteristics",
        ]}
      />
      <Dot paths={["/jobs/:id/description"]} />
      <Dot paths={["/jobs/:id/likely_to_hire"]} />
      <Dot paths={["/jobs/:id/publish"]} />
    </Box>
  );
}
