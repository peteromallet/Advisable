import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Text, Box, useBreakpoint } from "@advisable/donut";
import styled from "styled-components";
import { padding } from "styled-system";
import MultistepMenu from "../../components/MultistepMenu";
import Back from "../../components/Back";
import { useLocation } from "react-router";
import { filter } from "lodash-es";

const SidebarContainer = styled.div`
  width: 320px;
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Sidebar = styled.div`
  left: 0;
  top: 60px;
  width: 320px;
  position: fixed;
  height: calc(100vh - 60px);
  background: white;
  box-shadow: 0px 1px 20px rgba(14, 31, 91, 0.04);

  @media (max-width: 900px) {
    position: relative;
    height: auto;
    background: none;
    box-shadow: none;
    top: 0;
    width: 100%;
    padding: 0 0 20px 0;
  }

  ${padding};
`;

function ApplicationFlowSidebar({ application, steps, applicationId }) {
  const isDesktop = useBreakpoint("lUp");
  const location = useLocation();

  // Iterate through the STEPS and filter our any where hidden is true.
  const activeSteps = filter(steps, (step) => !step.hidden);
  const { project } = application;

  const multisteps = activeSteps.map((step, i) => {
    const previousStep = steps[i - 1];
    return (
      <MultistepMenu.Item
        key={step.name}
        exact={step.exact}
        isComplete={step.isComplete}
        isDisabled={previousStep ? !previousStep.isComplete : false}
        to={{
          ...location,
          pathname: `/invites/${applicationId}/apply${step.to}`,
          state: { from: location.pathname },
        }}
      >
        {step.name}
      </MultistepMenu.Item>
    );
  });

  return (
    <SidebarContainer>
      <Sidebar
        as={isDesktop ? motion.div : "div"}
        padding="m"
        initial={{ opacity: 0, left: -100 }}
        animate={{ opacity: 1, left: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box marginBottom="s">
          <Back to={`/invites/${applicationId}`}>View project details</Back>
        </Box>
        <Text
          as="h4"
          fontSize="xl"
          lineHeight="l"
          color="blue900"
          fontWeight="medium"
          letterSpacing="-0.01em"
        >
          {application.project.primarySkill?.name} project
        </Text>
        {(project.industry || project.companyType) && (
          <Text mt="xxs" fontSize="s" color="neutral500" fontWeight="medium">
            {project.industry} {project.companyType}
          </Text>
        )}
        <Text py="m" fontSize="xs" lineHeight="s" color="neutral700">
          {application.project.description}
        </Text>
        <MultistepMenu>{multisteps}</MultistepMenu>
      </Sidebar>
    </SidebarContainer>
  );
}

ApplicationFlowSidebar.propTypes = {
  application: PropTypes.object,
  steps: PropTypes.array,
  applicationId: PropTypes.string,
};

export default ApplicationFlowSidebar;
