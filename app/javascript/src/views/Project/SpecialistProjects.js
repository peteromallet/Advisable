import React from "react";
import Masonry from "components/Masonry";
import ProjectCard from "src/components/ProjectCard";
import { Box, Text, useBreakpoint } from "@advisable/donut";

export default function SpecialistProjects({ projects }) {
  const isLargeScreen = useBreakpoint("mUp");
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="xl"
        color="neutral900"
        marginBottom="16px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Similar Previous Projects
      </Text>
      <Masonry gutter={24} columns={isLargeScreen ? 2 : 1}>
        {projects
          .filter((p) => !!p.excerpt)
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </Masonry>
    </Box>
  );
}
