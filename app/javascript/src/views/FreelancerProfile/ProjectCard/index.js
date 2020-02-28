import React from "react";
import IndustryTag from "../../../components/IndustryTag";
import { Card, Box, Text, RoundedButton } from "@advisable/donut";

function ProjectCard({ project }) {
  return (
    <Card>
      <Box padding="l">
        <IndustryTag industry={project.industry} mb="s" />
        <Text
          mb="s"
          fontSize="xxl"
          color="blue900"
          fontWeight="semibold"
          letterSpacing="-0.02em"
        >
          {project.title}
        </Text>
        <Text fontSize="xs" color="neutral700" lineHeight="xs">
          {project.excerpt}
        </Text>
        <Box mt="l" mb="l">
          {project.skills.map(skill => (
            <Box
              mr="xxs"
              mb="xxs"
              px="12px"
              key={skill.id}
              height="26px"
              fontSize="xxs"
              bg="neutral100"
              color="neutral800"
              borderRadius="15px"
              alignItems="center"
              display="inline-flex"
            >
              {skill.name}
            </Box>
          ))}
        </Box>
        <RoundedButton variant="subtle">View Project</RoundedButton>
      </Box>
    </Card>
  );
}

export default ProjectCard;
