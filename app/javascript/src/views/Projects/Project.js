import React from "react";
import { DateTime } from "luxon";
import { rgba } from "polished";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AvatarStack from "components/AvatarStack";
import { theme, StyledCard, Text, Badge, Box, Avatar } from "@advisable/donut";

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
  const url = `/projects/${project.id}`;

  const matches = project.matches;

  return (
    <StyledProject as={Link} to={url} padding="l">
      <Text
        mb="4px"
        fontSize="2xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.05rem"
      >
        {project.primarySkill?.name || "New Project"}
      </Text>
      <Text mb="12px" fontSize="sm" color="neutral500">
        {DateTime.fromISO(project.createdAt).toRelative()}
      </Text>
      {project.status === "DRAFT" && <Badge variant="orange">Draft</Badge>}
      {project.status === "Brief Pending Confirmation" && (
        <Badge variant="orange">Draft</Badge>
      )}
      {project.status === "PENDING_REVIEW" && (
        <Badge variant="orange">In Review</Badge>
      )}
      {matches.length > 0 && (
        <Box>
          <Badge marginBottom="4px">{matches.length} New</Badge>
          <AvatarStack size="s">
            {matches.map((application) => (
              <Avatar
                key={application.id}
                url={application.specialist.avatar}
                name={application.specialist.name}
              />
            ))}
          </AvatarStack>
        </Box>
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
        <ProjectCount label="Candidates" count={project.candidateCount} />
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
