import React from "react";
import { rgba } from "polished";
import { Box, Text, theme, StyledCard } from "@advisable/donut";
import styled from "styled-components";
import ActionBarModal from "../../../Project/ActionBarModal";
import ProjectDetails from "components/PreviousProjectDetails";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";

const StyledSpecialistProject = styled(StyledCard)`
  cursor: pointer;
  user-select: none;
  transition: box-shadow 300ms;
  border-radius: 12px;
  box-shadow: 0px 4px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.08)};

  &:hover {
    box-shadow: 0px 12px 24px -12px ${rgba(theme.colors.neutral900, 0.08)},
      0px 24px 40px -24px ${rgba(theme.colors.neutral900, 0.12)};

    .projectTitle {
      color: ${theme.colors.blue600};
    }
  }
`;

function Project({ project }) {
  const dialog = useDialogState();

  return (
    <>
      <ActionBarModal
        leftIndent={0}
        width={700}
        dialog={dialog}
        label={project.title}
      >
        {dialog.visible && <ProjectDetails id={project.id} />}
      </ActionBarModal>
      <DialogDisclosure {...dialog} as={StyledSpecialistProject} padding="24px">
        {project.coverPhoto && (
          <Box
            width="100%"
            height="160px"
            borderRadius="12px"
            marginBottom="24px"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundColor="neutral100"
            backgroundImage={`url(${project.coverPhoto.url})`}
          />
        )}
        <Text
          fontSize="xl"
          lineHeight="22px"
          color="neutral900"
          marginBottom="8px"
          fontWeight="medium"
          letterSpacing="-0.02em"
          className="projectTitle"
        >
          {project.title}
        </Text>
        <Text
          fontSize="sm"
          color="neutral800"
          lineHeight="20px"
          // marginBottom="24px"
        >
          {project.excerpt}
        </Text>
        {/* <Tags tags={project.skills.map((s) => s.name)} /> */}
      </DialogDisclosure>
    </>
  );
}

export default Project;
