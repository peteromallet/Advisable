import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import Masonry from "components/Masonry";
import ProjectDetails from "components/PreviousProjectDetails";
import {
  theme,
  useModal,
  Box,
  StyledCard,
  Text,
  Tags,
  DialogDisclosure,
} from "@advisable/donut";

const StyledSpecialistProject = styled(StyledCard)`
  cursor: pointer;
  user-select: none;
  transition: box-shadow 300ms;
  box-shadow: 0 12px 24px -12px ${rgba(theme.colors.neutral900, 0.16)};

  &:hover {
    box-shadow: 0 24px 40px -24px ${rgba(theme.colors.neutral900, 0.24)};

    .projectTitle {
      color: ${theme.colors.blue600};
    }
  }
`;

function Project({ project }) {
  const modal = useModal();

  return (
    <>
      <ProjectDetails.Modal
        label={project.title}
        modal={modal}
        id={project.id}
      />
      <DialogDisclosure {...modal} as={StyledSpecialistProject} padding="24px">
        {project.coverPhoto && (
          <Box
            width="100%"
            height="160px"
            borderRadius="2px"
            marginBottom="24px"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundColor="neutral100"
            backgroundImage={`url(${project.coverPhoto.url})`}
          />
        )}
        <Text
          fontSize="20px"
          lineHeight="24px"
          color="neutral900"
          marginBottom="12px"
          fontWeight="medium"
          letterSpacing="-0.04em"
          className="projectTitle"
        >
          {project.title}
        </Text>
        <Text
          fontSize="14px"
          color="neutral700"
          lineHeight="20px"
          marginBottom="24px"
          letterSpacing="-0.01em"
        >
          {project.excerpt}
        </Text>
        <Tags tags={project.skills.map((s) => s.name)} />
      </DialogDisclosure>
    </>
  );
}

export default function SpecialistProjects({ projects }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="18px"
        color="neutral900"
        fontWeight="500"
        marginBottom="16px"
        letterSpacing="-0.02em"
      >
        Previous Projects
      </Text>
      <Masonry gutter={24}>
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </Masonry>
    </Box>
  );
}
