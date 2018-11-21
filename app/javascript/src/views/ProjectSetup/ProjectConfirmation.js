// Renders the confirmation steps for an existing project.
import React, { Fragment } from "react";
import find from "lodash/find";
import filter from "lodash/filter";
import { Query } from "react-apollo";
import Loading from "src/components/Loading";
import { Route, Switch, Redirect } from "react-router-dom";
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
    component: CompanyOverview
  },
  {
    title: "Project Overview",
    path: "/project_overview",
    component: ProjectOverview
  },
  {
    title: "Project Goals",
    path: "/goals",
    component: ProjectGoals
  },
  {
    title: "Specialist Overview",
    path: "/specialist_overview",
    component: SpecialistOverview
  },
  {
    title: "Must-have Characteristics",
    path: "/must_have",
    component: MustHaveCharacteristics
  },
  {
    title: "Nice-to-have Characteristics",
    path: "/nice_to_have",
    component: NiceToHaveCharacteristics
  },
  {
    title: "Qualification Questions",
    path: "/questions",
    component: Questions
  },
  {
    title: "Terms & Conditions",
    path: "/terms",
    component: Terms
  },
  {
    title: "Recruitement Deposit",
    path: "/deposit",
    component: Deposit,
    enabled: project => project.depositOwed > 0
  }
];

// Returns the route config for the current step based on the current URL
const currentRoute = () => {
  const path = window.location.pathname;
  return find(ROUTES, route => {
    return path.indexOf(route.path) > -1;
  });
};

const filterRoutes = project => {
  return filter(ROUTES, route => {
    if (route.enabled) {
      return route.enabled(project);
    }
    return true;
  });
};

export default ({ match }) => {
  return (
    <Query query={FETCH_PROJECT} variables={{ id: match.params.projectID }}>
      {query => {
        if (query.loading) return <Loading />;

        if (query.data.project.status !== "Project Pending Approval") {
          return <Redirect to={`/projects/${match.params.projectID}`} />
        }

        const routes = filterRoutes(query.data.project);
        const route = currentRoute() || {};
        const number = routes.indexOf(route) + 1;
        const isStep = routes.indexOf(route) > -1;

        return (
          <Fragment>
            {isStep && (
              <React.Fragment>
                <Step>Step {number} of {routes.length}</Step>
                <StepHeading>{route.title}</StepHeading>
                <Progress amount={(number / (routes.length + 1)) * 100} />
              </React.Fragment>
            )}
            <Switch>
              {routes.map(route => {
                const Component = route.component;
                return (
                  <Route
                    key={route.path}
                    path={`${match.path}${route.path}`}
                    render={route => (
                      <Component {...route} project={query.data.project} />
                    )}
                  />
                );
              })}
              <Route
                path={`${match.path}/confirm`}
                render={route => (
                  <SubmitConfirmation project={query.data.project} {...route} />
                )}
              />
              <Redirect to={`${match.path}${routes[routes.length - 1].path}`} />
            </Switch>
          </Fragment>
        );
      }}
    </Query>
  );
};
