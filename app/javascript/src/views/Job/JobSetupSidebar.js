import React from "react";
import { padding } from "styled-system";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import BackButton from "components/BackButton";
import MultistepMenu from "../../components/MultistepMenu";
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

  React.useEffect(() => {
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
            to={`/jobs/${id}/skills`}
            isComplete={completeSteps.skills}
            steps={[
              { label: "Skill Set", to: `/jobs/${id}/skills` },
              { label: "Primary Skill", to: `/jobs/${id}/primary_skill` },
              { label: "Experience", to: `/jobs/${id}/experience` },
            ]}
            exact
          >
            Skills
          </MultistepMenu.Item>
          <MultistepMenu.Item
            isDisabled={!completeSteps.skills}
            isComplete={completeSteps.location}
            to={`/jobs/${id}/location`}
          >
            Location
          </MultistepMenu.Item>
          <MultistepMenu.Item
            to={`/jobs/${id}/characteristics`}
            isDisabled={!completeSteps.location}
            isComplete={completeSteps.characteristics}
            steps={[
              {
                label: "Character Traits",
                to: `/jobs/${id}/characteristics`,
              },
              {
                label: "Required",
                to: `/jobs/${id}/required_characteristics`,
              },
            ]}
          >
            Characteristics
          </MultistepMenu.Item>
          <MultistepMenu.Item
            isComplete={completeSteps.description}
            isDisabled={!completeSteps.characteristics}
            to={`/jobs/${id}/description`}
          >
            Description
          </MultistepMenu.Item>
          <MultistepMenu.Item
            isDisabled={!completeSteps.description}
            isComplete={completeSteps.specialists}
            to={`/jobs/${id}/likely_to_hire`}
          >
            Specialists
          </MultistepMenu.Item>
          <MultistepMenu.Item
            to={`/jobs/${id}/publish`}
            isDisabled={!completeSteps.specialists}
          >
            Review
          </MultistepMenu.Item>
        </MultistepMenu>
      </Sidebar>
    </SidebarContainer>
  );
}
