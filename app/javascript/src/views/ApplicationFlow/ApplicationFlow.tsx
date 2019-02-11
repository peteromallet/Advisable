import * as React from "react";
import Sticky from "react-stickynode";
import { Switch, Route, match, Redirect } from "react-router-dom";
import Back from "../../components/Back";
import Steps from "../../components/Steps";
import { useScreenSize } from "../../utilities/screenSizes";
import { Layout, Heading, Text, Padding, Card } from "../../components";
import Terms from "./Terms";
import Overview from "./Overview";
import Questions from "./Questions";
import References from "./References";

interface Props {
  application: {
    introduction: string;
    availability: string;
    questions: [
      {
        question: string;
      }
    ];
    project: {
      primarySkill: string;
      companyDescription: string;
      user: {
        companyName: string;
      };
    };
  };
  match: match;
}

const ApplicationFlow = ({ application, match }: Props) => {
  const isMobile = useScreenSize("small");
  const applicationId = match.params.applicationId;

  const STEPS = [
    {
      exact: true,
      name: "Overview",
      to: "/",
      path: "/",
      component: Overview,
      isComplete: true
      // isComplete: Boolean(application.introduction && application.availability)
    },
    {
      name: "Application Questions",
      to: "/questions",
      path: "/questions/:number?",
      component: Questions,
      isComplete: true
    },
    {
      name: "References",
      to: "/references",
      path: "/references",
      component: References,
      isComplete: true
    },
    {
      name: "Payment terms",
      to: "/terms",
      path: "/terms",
      component: Terms,
      isComplete: true
    }
  ];

  return (
    <Layout>
      {!isMobile && (
        <Layout.Sidebar>
          <Sticky top={97}>
            <Padding bottom="s">
              <Back to={`/invites/${match.params.applicationId}`}>
                View project details
              </Back>
            </Padding>
            <Padding bottom="m">
              <Heading level={4}>
                Applying to {application.project.primarySkill} at{" "}
                {application.project.user.companyName}
              </Heading>
            </Padding>
            <Padding bottom="l">
              <Text size="xs">{application.project.companyDescription}</Text>
            </Padding>
            <Steps>
              {STEPS.map((step, i) => {
                const previousStep = STEPS[i - 1];

                return (
                  <Steps.Step
                    key={step.name}
                    exact={step.exact}
                    number={i + 1}
                    isComplete={step.isComplete}
                    to={`/invites/${applicationId}/apply${step.to}`}
                    isDisabled={previousStep ? !previousStep.isComplete : false}
                  >
                    {step.name}
                  </Steps.Step>
                );
              })}
            </Steps>
          </Sticky>
        </Layout.Sidebar>
      )}
      <Layout.Main>
        <Card>
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
                  render={props =>
                    previousStepComplete ? (
                      <Component
                        steps={STEPS}
                        currentStep={i}
                        application={application}
                        {...props}
                      />
                    ) : (
                      <Redirect
                        to={`/invites/${applicationId}/apply${
                          previousStep.path
                        }`}
                      />
                    )
                  }
                />
              );
            })}
          </Switch>
        </Card>
      </Layout.Main>
    </Layout>
  );
};

export default ApplicationFlow;
