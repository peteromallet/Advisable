import React from "react";
import { rgba } from "polished";
import { Button, Box, Text, theme, StyledCard } from "@advisable/donut";
import styled from "styled-components";
import ActionBarModal from "src/views/Project/ActionBarModal";
import ProjectDetails from "src/components/PreviousProjectDetails";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { Home, ArrowRight } from "@styled-icons/feather";
import Tags from "./Tags";
import ProjectStatus from "./ProjectStatus";

const StyledSpecialistProject = styled(StyledCard)`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  transition: box-shadow 300ms;
  border-radius: 12px;
  box-shadow: 0px 4px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.08)};

  &:hover {
    box-shadow: 0px 12px 24px -12px ${rgba(theme.colors.neutral900, 0.08)},
      0px 24px 40px -24px ${rgba(theme.colors.neutral900, 0.12)};
  }
`;

const StyledHoverDecoration = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 32px;
  opacity: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
  min-height: 180px;
  background: linear-gradient(
    360deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.93) 40%,
    rgba(255, 255, 255, 0) 100%
  );
  transition: opacity 0.4s;

  ${StyledSpecialistProject}:hover & {
    opacity: 1;
  }
`;

function Project({ project }) {
  const dialog = useDialogState();
  const NUM_OF_SKILL_TAGS = 5;
  const extraSkills = project.skills.length - NUM_OF_SKILL_TAGS;
  let skillTags = project.skills.slice(0, NUM_OF_SKILL_TAGS).map((s) => s.name);
  extraSkills > 0 && skillTags.push(`+${extraSkills}`);
  return (
    <>
      <ActionBarModal
        width={800}
        leftIndent={0}
        dialog={dialog}
        label={project.title}
      >
        {dialog.visible && <ProjectDetails id={project.id} />}
      </ActionBarModal>
      <DialogDisclosure
        {...dialog}
        as={StyledSpecialistProject}
        padding="24px"
        data-testid="project-card"
      >
        <StyledHoverDecoration>
          <Button variant="subtle" suffix={<ArrowRight />}>
            View More
          </Button>
        </StyledHoverDecoration>
        {project.coverPhoto && (
          <Box
            width="100%"
            height="160px"
            borderRadius="12px"
            marginBottom="24px"
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundColor="neutral100"
            backgroundImage={`url("${project.coverPhoto.url}")`}
          />
        )}
        <Text
          fontSize="xl"
          lineHeight="22px"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.02em"
          className="projectTitle"
        >
          {project.primarySkill?.name || project.skills[0]?.name} project
        </Text>
        <Box
          color="neutral600"
          display="flex"
          alignItems="center"
          mb="xs"
          mt="2px"
        >
          <Home size={18} />
          <Text
            fontSize="m"
            lineHeight="22px"
            color="neutral600"
            letterSpacing="-0.02em"
            className="clientName"
            mt="xxs"
            ml="xxs"
          >
            {project.clientName}
          </Text>
        </Box>
        <Text
          fontSize="sm"
          color="neutral800"
          lineHeight="20px"
          marginBottom={2}
        >
          {project.excerpt}
        </Text>
        <Tags
          primarySkill={project.primarySkill}
          skills={project.skills}
          primaryIndustry={project.primaryIndustry}
          industries={project.industries}
        />
        <ProjectStatus project={project} />
      </DialogDisclosure>
    </>
  );
}

export default Project;
