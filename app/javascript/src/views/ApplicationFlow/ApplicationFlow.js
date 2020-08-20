import * as React from "react";
import { isEmpty, filter } from "lodash-es";
import { Switch, Route, Redirect } from "react-router-dom";
import Back from "../../components/Back";
import VariantSystem from "../../components/VariantSystem";
import { useScreenSize } from "../../utilities/screenSizes";
import { Text, Box, useBreakpoint } from "@advisable/donut";
import MultistepMenu from "../../components/MultistepMenu";
import { Layout } from "../../components";
import Helper from "./Helper";
import Terms from "./Terms";
import Overview from "./Overview";
import Questions from "./Questions";
import References from "./References";
import { motion } from "framer-motion";
import styled from "styled-components";
import { padding } from "styled-system";

const SidebarContainer = styled.div`
  width: 280px;
  position: relative;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Sidebar = styled.div`
  left: 0;
  top: 60px;
  width: 280px;
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

const ApplicationFlow = ({ application, match, location }) => {
  const isMobile = useScreenSize("small");
  const isDesktop = useBreakpoint("lUp");
  const applicationId = match.params.applicationId;

  // Some steps are able to be skipped. e.g the references step. The skipped
  // variable is an array of step names to keep track of the steps that have
  // been skipped.
  const [skipped, setSkipped] = React.useState([]);
  const skipStep = (step) => setSkipped([...skipped, step.name]);

  // Various parts of this flow need to act differently based on wether the user
  // is applying or updating an existing application.
  const isApplying = application.status === "Invited To Apply";

  // STEPS defines all of the various steps inside the application flow.
  // Note how each step returns true if isApplying is false. This is to allow
  // the user to jump between steps when they are updating an existing
  // application.
  const STEPS = [
    {
      exact: true,
      name: "Overview",
      to: "/",
      path: "/",
      component: Overview,
      isComplete: Boolean(application.introduction && application.availability),
    },
    {
      name: "Application Questions",
      to: "/questions",
      path: "/questions/:number?",
      component: Questions,
      hidden: application.project.questions.length === 0,
      isComplete:
        !isApplying ||
        filter(application.questions, (q) => !isEmpty(q.answer)).length >=
          application.project.questions.length,
    },
    {
      name: "References",
      to: "/references",
      path: "/references",
      component: References,
      isComplete:
        !isApplying ||
        skipped.indexOf("References") !== -1 ||
        application.previousProjects.length > 0,
    },
    {
      name: "Payment terms",
      to: "/terms",
      path: "/terms",
      component: Terms,
      isComplete:
        !isApplying ||
        Boolean(
          application.rate &&
            application.acceptsFee &&
            application.acceptsTerms,
        ),
    },
  ];

  // Iterate through the STEPS and filter our any where hidden is true.
  const activeSteps = filter(STEPS, (step) => !step.hidden);
  const { project } = application;

  return (
    <Box display="flex">
      <VariantSystem variantsRange={[0, 2]} />
      <SidebarContainer>
        <Sidebar
          as={isDesktop ? motion.div : "div"}
          padding="m"
          initial={{ opacity: 0, left: -100 }}
          animate={{ opacity: 1, left: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box marginBottom="s">
            <Back to={`/invites/${match.params.applicationId}`}>
              View project details
            </Back>
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
          <MultistepMenu>
            {activeSteps.map((step, i) => {
              const previousStep = STEPS[i - 1];
              return (
                <MultistepMenu.Item
                  key={step.name}
                  exact={step.exact}
                  isComplete={step.isComplete}
                  isDisabled={previousStep ? !previousStep.isComplete : false}
                  to={{
                    ...location,
                    pathname: `/invites/${applicationId}/apply${step.to}`,
                  }}
                >
                  {step.name}
                </MultistepMenu.Item>
              );
            })}
          </MultistepMenu>
        </Sidebar>
      </SidebarContainer>
      <Box
        mx="auto"
        width="100%"
        position="relative"
        my={{ _: 0, m: "64px" }}
        padding={{ _: "24px", m: "0" }}
        maxWidth={{ _: "100%", m: "680px" }}
      >
        <Switch>
          {STEPS.map((step, i) => {
            const Component = step.component;
            const previousStep = STEPS[i - 1];
            const previousStepComplete = previousStep
              ? previousStep.isComplete
              : true;

            return (
              <Route
                key={step.path}
                exact={step.exact}
                path={`/invites/:applicationId/apply${step.path}`}
                render={(props) =>
                  previousStepComplete ? (
                    <Component
                      steps={STEPS}
                      currentStep={i}
                      application={application}
                      skipStep={() => skipStep(step)}
                      {...props}
                    />
                  ) : (
                    <Redirect
                      to={`/invites/${applicationId}/apply${previousStep.path}`}
                    />
                  )
                }
              />
            );
          })}
        </Switch>
      </Box>
    </Box>
  );
};

export default ApplicationFlow;
