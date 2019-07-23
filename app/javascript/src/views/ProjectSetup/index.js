// Renders the confirmation steps for a project.
import { graphql } from "react-apollo";
import { Transition, animated } from "react-spring/renderprops.cjs";
import { Route, Switch, Redirect } from "react-router";
import React, { Fragment, useEffect, useRef } from "react";
import NotFound from "src/views/NotFound";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import Progress from "./Progress";
import FETCH_PROJECT from "./fetchProject";
import { stepsForProject, currentStep } from "./Steps";
import { Container, Step, StepHeading } from "./styles";

const ProjectSetup = ({ data = {}, match }) => {
  if (data.loading) return <Loading />;

  if (match.params.projectID && !data.project) {
    return <NotFound />;
  }

  // Redirect to the project dashboard if the status is not pending approval
  if (data.project && data.project.status !== "Brief Pending Confirmation") {
    return <Redirect to={`/projects/${match.params.projectID}`} />;
  }

  // Filter the steps that are required for the project.
  const steps = stepsForProject(data.project);
  const step = currentStep() || {};
  const currentStepNumber = steps.indexOf(step) + 1;

  // Keep track of the last step.
  const lastStepRef = useRef(currentStepNumber);
  useEffect(() => {
    lastStepRef.current = currentStepNumber;
  });
  const previousStep = lastStepRef.current;

  return (
    <Fragment>
      <Header />
      <Container>
        {/* If the current step has a title then we need to render the header
        section */}
        {step.title && (
          <React.Fragment>
            <Step>
              Step {currentStepNumber} of {steps.length - 1}
            </Step>
            <StepHeading>{step.title}</StepHeading>
            <Progress amount={(currentStepNumber / steps.length) * 100} />
          </React.Fragment>
        )}

        {/* Integrate the steps with react-spring animations. For each animation
        we compare with the previousStep to see if we need to animate forwards
        or backwards */}
        <Route
          render={({ location }) => (
            <Transition
              initial={null}
              items={location}
              keys={location => location.pathname}
              from={{
                opacity: 0,
                transform:
                  currentStepNumber > previousStep
                    ? "translateX(300px)"
                    : "translateX(-300px)",
              }}
              enter={{ opacity: 1, transform: "translateX(0px)" }}
              leave={{
                opacity: 0,
                position: "absolute",
                transform:
                  currentStepNumber <= previousStep
                    ? "translateX(300px)"
                    : "translateX(-300px)",
              }}
            >
              {location => transition => (
                <Switch location={location}>
                  {steps.map(route => {
                    const Component = route.component;
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        render={route => (
                          <animated.div style={transition}>
                            <Component {...route} project={data.project} />
                          </animated.div>
                        )}
                      />
                    );
                  })}
                </Switch>
              )}
            </Transition>
          )}
        />
      </Container>
    </Fragment>
  );
};

export default graphql(FETCH_PROJECT, {
  options: props => ({
    variables: {
      id: props.match.params.projectID,
    },
  }),
  // We also need to handle the case when the user is at /project_setup and
  // there is no projectID in the url. In these cases we simply skip the query
  skip: props => props.match.params.projectID === undefined,
})(ProjectSetup);
