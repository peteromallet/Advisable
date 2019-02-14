import * as React from "react";
import Sticky from "react-stickynode";
import { isEmpty, filter } from "lodash";
import { Switch, Route, match, Redirect } from "react-router-dom";
import Back from "../../components/Back";
import Steps from "../../components/Steps";
import { useScreenSize } from "../../utilities/screenSizes";
import { Layout, Heading, Text, Padding, Card } from "../../components";
import Terms from "./Terms";
import Overview from "./Overview";
import Questions from "./Questions";
import References from "./References";

type Question = {
  question: string;
  answer?: string;
}

interface Props {
  application: {
    introduction: string;
    availability: string;
    questions: Question[];
    previousProjects: [
      {
        id: string;
      }
    ];
    project: {
      primarySkill: string;
      companyDescription: string;
    };
    rate: string;
    acceptsFee: boolean;
    acceptsTerms: boolean;
  };
  match: match;
  location: object;
}

const ApplicationFlow = ({ application, match, location }: Props) => {
  const isMobile = useScreenSize("small");
  const applicationId = match.params.applicationId;

  const STEPS = [
    {
      exact: true,
      name: "Overview",
      to: "/",
      path: "/",
      component: Overview,
      isComplete: Boolean(application.introduction && application.availability)
    },
    {
      name: "Application Questions",
      to: "/questions",
      path: "/questions/:number?",
      component: Questions,
      hidden: application.questions.length === 0,
      isComplete: isEmpty(
        filter(application.questions, q => {
          return isEmpty(q.answer);
        })
      )
    },
    {
      name: "References",
      to: "/references",
      path: "/references",
      component: References,
      isComplete: !isEmpty(application.previousProjects)
    },
    {
      name: "Payment terms",
      to: "/terms",
      path: "/terms",
      component: Terms,
      isComplete: Boolean(
        application.rate && application.acceptsFee && application.acceptsTerms
      )
    }
  ];

  // On mobile we dont want to show the main content inside of a card and so
  // we just use a div.
  let ContentContainer = isMobile ? "div" : Card;

  const activeSteps = filter(STEPS, step => !step.hidden);

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
                Applying to {application.project.primarySkill} project
              </Heading>
            </Padding>
            <Padding bottom="l">
              <Text size="xs">{application.project.companyDescription}</Text>
            </Padding>
            <Steps>
              {activeSteps.map((step, i) => {
                const previousStep = STEPS[i - 1];
                return (
                  <Steps.Step
                    key={step.name}
                    exact={step.exact}
                    number={i + 1}
                    isComplete={step.isComplete}
                    to={{
                      ...location,
                      pathname: `/invites/${applicationId}/apply${step.to}`
                    }}
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
        <ContentContainer>
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
        </ContentContainer>
      </Layout.Main>
    </Layout>
  );
};

export default ApplicationFlow;
