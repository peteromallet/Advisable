import * as React from "react";
import Sticky from "../../components/Sticky";
import { isEmpty, filter } from "lodash";
import { Switch, Route, Redirect } from "react-router-dom";
import Back from "../../components/Back";
import Steps from "../../components/Steps";
import { useScreenSize } from "../../utilities/screenSizes";
import { Text, Box, NavigationMenu } from "@advisable/donut";
import { Layout } from "../../components";
import Terms from "./Terms";
import Overview from "./Overview";
import Questions from "./Questions";
import References from "./References";

const ApplicationFlow = ({ application, match, location }) => {
  const isMobile = useScreenSize("small");
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
    <Layout>
      {!isMobile && (
        <Layout.Sidebar size="l">
          <Sticky offset={98}>
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
              {application.project.primarySkill} project
            </Text>
            {(project.industry || project.companyType) && (
              <Text
                mt="xxs"
                fontSize="s"
                color="neutral500"
                fontWeight="medium"
              >
                {project.industry} {project.companyType}
              </Text>
            )}
            <Text py="m" fontSize="xs" lineHeight="s" color="neutral700">
              {application.project.description}
            </Text>
            <NavigationMenu>
              {activeSteps.map((step, i) => {
                const previousStep = STEPS[i - 1];
                return (
                  <NavigationMenu.Item
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
                  </NavigationMenu.Item>
                );
              })}
            </NavigationMenu>
          </Sticky>
        </Layout.Sidebar>
      )}
      <Layout.Main>
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
      </Layout.Main>
    </Layout>
  );
};

export default ApplicationFlow;
