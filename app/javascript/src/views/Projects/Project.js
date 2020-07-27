import React from "react";
import { DateTime } from "luxon";
import { rgba } from "polished";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme, StyledCard, Text, Badge, Box } from "@advisable/donut";

const StyledProject = styled(StyledCard)`
  width: 100%;
  height: 300px;
  position: relative;
  transition: box-shadow 0.3s, transform 0.2s;
  box-shadow: 0px 8px 24px -8px ${rgba(theme.colors.blue900, 0.12)};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 16px 40px -16px ${rgba(theme.colors.blue900, 0.24)};
  }
`;

export default function Project({ project }) {
  let url = `/projects/${project.airtableId}`;

  if (
    project.status === "Draft" ||
    project.status === "Pending Advisable Confirmation"
  ) {
    url = `/jobs/${project.id}`;
  }

  return (
    <StyledProject as={Link} to={url} padding="l">
      <Text
        mb="4px"
        fontSize="20px"
        color="blue900"
        fontWeight="medium"
        letterSpacing="-0.05rem"
      >
        {project.primarySkill?.name || "New Project"}
      </Text>
      <Text mb="12px" fontSize="xs" color="neutral500">
        {DateTime.fromISO(project.createdAt).toRelative()}
      </Text>
      {project.status === "Draft" && <Badge variant="orange">Draft</Badge>}
      {project.status === "Brief Pending Confirmation" && (
        <Badge variant="orange">Draft</Badge>
      )}
      {project.status === "Pending Advisable Confirmation" && (
        <Badge variant="orange">In Review</Badge>
      )}
      <Box
        left="0"
        bottom="0"
        width="100%"
        padding="l"
        gridGap="8px"
        display="grid"
        position="absolute"
        gridTemplateColumns="1fr 1fr 1fr"
      >
        <ProjectCount label="Matches" count={project.candidateCount} />
        <ProjectCount label="Proposals" count={project.proposedCount} />
        <ProjectCount label="Hired" count={project.hiredCount} />
      </Box>
    </StyledProject>
  );
}

function ProjectCount({ label, count }) {
  return (
    <Box px="12px" py="10px" bg="#F3F3F3" borderRadius="8px">
      <Text fontWeight="medium" fontSize="18px" color="blue900" mb="2px">
        {count}
      </Text>
      <Text fontWeight="medium" fontSize="xxs" color="neutral500">
        {label}
      </Text>
    </Box>
  );
}
