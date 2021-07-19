import React from "react";
import PropTypes from "prop-types";
import filter from "lodash/filter";
import { useLocation } from "react-router";
import { Text, Box } from "@advisable/donut";
import Back from "src/components/Back";
import MultistepMenu from "src/components/MultistepMenu";

function ApplicationFlowNavigation({ application, steps, applicationId }) {
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
    <>
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
    </>
  );
}

ApplicationFlowNavigation.propTypes = {
  application: PropTypes.object,
  steps: PropTypes.array,
  applicationId: PropTypes.string,
};

export default ApplicationFlowNavigation;
