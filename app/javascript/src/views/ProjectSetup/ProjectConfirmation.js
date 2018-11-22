// Renders the confirmation steps for an existing project.
import React, { Fragment, useEffect, useRef } from "react";
import { Transition } from "react-spring";
import find from "lodash/find";
import filter from "lodash/filter";
import { graphql } from "react-apollo";
import Loading from "src/components/Loading";
import { Route, Switch, Redirect } from "react-router";
import Progress from "./Progress";
import Terms from "./Steps/Terms";
import Deposit from "./Steps/Deposit";
import Questions from "./Steps/Questions";
import ProjectGoals from "./Steps/ProjectGoals";
import CompanyOverview from "./Steps/CompanyOverview";
import ProjectOverview from "./Steps/ProjectOverview";
import SpecialistOverview from "./Steps/SpecialistOverview";
import SubmitConfirmation from "./Steps/SubmitConfirmation";
import MustHaveCharacteristics from "./Steps/MustHaveCharacteristics";
import NiceToHaveCharacteristics from "./Steps/NiceToHaveCharacteristics";
import { Step, StepHeading } from "./styles";
import FETCH_PROJECT from "./fetchProject.graphql";

// For the project confirmation flow each step is definied as a route in the arrow below.
// each route can have an optional 'required' key which is a function that takes the project
// data as a param and deteremins wether or not to include the step. This is useful for
// steps like the deposit which is only required some times.
const ROUTES = [
  {
    title: "Company Overview",
    path: "/company_overview",
    component: CompanyOverview,

  },
  {
    title: "Project Overview",
    path: "/project_overview",
    component: ProjectOverview,
  
  },
  {
    title: "Project Goals",
    path: "/goals",
    component: ProjectGoals,
   
  },
  {
    title: "Specialist Overview",
    path: "/specialist_overview",
    component: SpecialistOverview,
  
  },
  {
    title: "Must-have Characteristics",
    path: "/must_have",
    component: MustHaveCharacteristics,
 
  },
  {
    title: "Nice-to-have Characteristics",
    path: "/nice_to_have",
    component: NiceToHaveCharacteristics
  },
  {
    title: "Qualification Questions",
    path: "/questions",
    component: Questions,
  
  },
  {
    title: "Terms & Conditions",
    path: "/terms",
    component: Terms,

  },
  {
    title: "Recruitement Deposit",
    path: "/deposit",
    component: Deposit,
    enabled: project => project.depositOwed > 0,
  },
  {
    path: "/confirm",
    component: SubmitConfirmation
  }
];

const filterRoutes = project => {
  return filter(ROUTES, route => {
    if (route.enabled) {
      return route.enabled(project);
    }
    return true;
  });
};

// Returns the route config for the current step based on the current URL
const currentRoute = () => {
  const path = window.location.pathname;
  return find(ROUTES, route => {
    return path.indexOf(route.path) > -1;
  });
};

const ProjectConfirmation = ({ data, match }) => {
  if (data.loading) return <Loading />;

  if (data.project.status !== "Project Pending Approval") {
    return <Redirect to={`/projects/${match.params.projectID}`} />;
  }

  const routes = filterRoutes(data.project);
  const route = currentRoute() || {};
  const number = routes.indexOf(route) + 1;
  const title = route.title;

  const lastStepRef = useRef(number);
  useEffect(() => {
    lastStepRef.current = number;
  });
  const previousStep = lastStepRef.current;

  if (match.isExact) {
    return <Redirect to={`${match.url}${routes[0].path}`} />;
  }

  return (
    <Fragment>
      {title && (
        <React.Fragment>
          <Step>
            Step {number} of {routes.length - 1}
          </Step>
          <StepHeading>{title}</StepHeading>
          <Progress amount={(number / routes.length) * 100} />
        </React.Fragment>
      )}
      <Route
        render={({ location }) => (
          <Transition
            initial={null}
            items={location}
            keys={location => location.key}
            from={{
              opacity: 0,
              transform:
                number > previousStep
                  ? "translateX(300px)"
                  : "translateX(-300px)"
            }}
            enter={{ opacity: 1, transform: "translateX(0px)" }}
            leave={{
              opacity: 0,
              position: "absolute",
              transform:
                number <= previousStep
                  ? "translateX(300px)"
                  : "translateX(-300px)"
            }}
          >
            {location => transition => (
              <Switch location={location}>
                {routes.map(route => {
                  const Component = route.component;
                  return (
                    <Route
                      key={route.path}
                      path={`${match.path}${route.path}`}
                      render={route => (
                        <Component
                          {...route}
                          {...transition}
                          project={data.project}
                        />
                      )}
                    />
                  );
                })}
              </Switch>
            )}
          </Transition>
        )}
      />
    </Fragment>
  );
};

export default graphql(FETCH_PROJECT, {
  options: props => ({
    variables: {
      id: props.match.params.projectID
    }
  })
})(ProjectConfirmation);
