// Renders the confirmation steps for a project.
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router";
import NotFound from "src/views/NotFound";
import Loading from "src/components/Loading";
import Progress from "./Progress";
import FETCH_PROJECT from "./fetchProject";
import { stepsForProject, currentStep } from "./Steps";
import { Container, Step, StepHeading } from "./styles";

function ProjectSetupWrapper({ match }) {
  const location = useLocation();
  const { data, loading, error } = useQuery(FETCH_PROJECT, {
    variables: {
      id: match.params.projectID,
    },
    skip: match.params.projectID === undefined,
  });

  if (loading) return <Loading />;

  if (error?.graphQLErrors[0]?.extensions?.code === "authenticationRequired") {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  if (match.params.projectID && !data.project) {
    return <NotFound />;
  }

  // Redirect to the project dashboard if the status is not pending approval
  if (data.project && data.project.status !== "Brief Pending Confirmation") {
    return <Redirect to={`/projects/${match.params.projectID}`} />;
  }

  return <ProjectSetup data={data} />;
}

const ProjectSetup = ({ data }) => {
  // Filter the steps that are required for the project.
  const steps = stepsForProject(data.project);
  const step = currentStep() || {};
  const currentStepNumber = steps.indexOf(step) + 1;

  return (
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

      <Switch>
        {steps.map((route) => {
          const Component = route.component;
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={(route) => (
                <Component {...route} project={data.project} />
              )}
            />
          );
        })}
      </Switch>
    </Container>
  );
};

export default ProjectSetupWrapper;
