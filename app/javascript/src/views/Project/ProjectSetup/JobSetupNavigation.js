import React from "react";
import { Box } from "@advisable/donut";
import DeleteDraftJob from "./DeleteDraftJob";
import { useLocation, useParams } from "react-router-dom";
import MultistepMenu from "src/components/MultistepMenu";
import BackButton from "src/components/BackButton";
import useViewer from "src/hooks/useViewer";
import { setupProgress } from "./SetupSteps";

export default function JobSetupSidebar({ data }) {
  const { id } = useParams();
  const location = useLocation();
  const viewer = useViewer();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { project } = data;
  const completeSteps = setupProgress(project);
  const canDelete = viewer.isTeamManager || project.isOwner;

  return (
    <>
      <BackButton to="/projects" marginBottom="m" />
      <MultistepMenu>
        <MultistepMenu.Item
          to={`/projects/${id}/setup/skills`}
          isComplete={completeSteps.skillImportance}
          steps={[
            {
              label: "Skill Set",
              to: `/projects/${id}/setup/skills`,
            },
            {
              label: "Primary Skill",
              to: `/projects/${id}/setup/primary_skill`,
              isDisabled: !completeSteps.skills,
            },
            {
              label: "Experience",
              to: `/projects/${id}/setup/experience`,
              isDisabled: !completeSteps.primarySkill,
            },
          ]}
          exact
        >
          Skills
        </MultistepMenu.Item>
        <MultistepMenu.Item
          isDisabled={!completeSteps.skillImportance}
          isComplete={completeSteps.location}
          to={`/projects/${id}/setup/location`}
        >
          Location
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to={`/projects/${id}/setup/characteristics`}
          isDisabled={!completeSteps.location}
          isComplete={completeSteps.requiredCharacteristics}
          steps={[
            {
              label: "Character Traits",
              to: `/projects/${id}/setup/characteristics`,
            },
            {
              label: "Required",
              to: `/projects/${id}/setup/required_characteristics`,
              isDisabled: !completeSteps.characteristics,
            },
          ]}
        >
          Characteristics
        </MultistepMenu.Item>
        <MultistepMenu.Item
          isComplete={completeSteps.description}
          isDisabled={!completeSteps.requiredCharacteristics}
          to={`/projects/${id}/setup/description`}
        >
          Goals
        </MultistepMenu.Item>
        <MultistepMenu.Item
          isDisabled={!completeSteps.description}
          isComplete={completeSteps.specialists}
          to={`/projects/${id}/setup/likely_to_hire`}
        >
          Specialists
        </MultistepMenu.Item>
        <MultistepMenu.Item
          to={`/projects/${id}/setup/publish`}
          isDisabled={!completeSteps.specialists}
        >
          Review
        </MultistepMenu.Item>
      </MultistepMenu>
      {canDelete ? (
        <Box position="absolute" bottom="24px" left="24px">
          <DeleteDraftJob id={id} />
        </Box>
      ) : null}
    </>
  );
}
