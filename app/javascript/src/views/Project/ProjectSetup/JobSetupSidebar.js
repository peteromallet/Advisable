import { useEffect } from "react";
import { padding } from "styled-system";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Box } from "@advisable/donut";
import DeleteDraftJob from "./DeleteDraftJob";
import { useLocation, useParams } from "react-router-dom";
import BackButton from "components/BackButton";
import MultistepMenu from "components/MultistepMenu";
import { setupProgress } from "./SetupSteps";

const SidebarContainer = styled.div`
  width: 280px;
  position: relative;
`;

const Sidebar = styled.div`
  left: 0;
  top: 60px;
  width: 280px;
  position: fixed;
  background: white;
  height: calc(100vh - 60px);
  box-shadow: 0px 1px 20px rgba(14, 31, 91, 0.04);

  ${padding};
`;

export default function JobSetupSidebar({ data }) {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { project } = data;
  const completeSteps = setupProgress(project);

  return (
    <SidebarContainer>
      <Sidebar
        as={motion.div}
        padding="m"
        initial={{ opacity: 0, left: -100 }}
        animate={{ opacity: 1, left: 0 }}
        transition={{ duration: 0.5 }}
      >
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
        <Box position="absolute" bottom="24px" left="24px">
          <DeleteDraftJob id={id} />
        </Box>
      </Sidebar>
    </SidebarContainer>
  );
}
