// Renders the confirmation steps for an existing project.
import React from "react";
import find from 'lodash/find';
import { Route, Switch, Redirect } from "react-router-dom";
import ProjectGoals from "./Steps/ProjectGoals";
import CompanyOverview from "./Steps/CompanyOverview";
import ProjectOverview from "./Steps/ProjectOverview";
import SpecialistOverview from "./Steps/SpecialistOverview";
import MustHaveCharacteristics from "./Steps/MustHaveCharacteristics";
import NiceToHaveCharacteristics from "./Steps/NiceToHaveCharacteristics";
import Questions from "./Steps/Questions";
import Terms from "./Steps/Terms";
import Deposit from "./Steps/Deposit";
import Progress from './Progress';
import { Step, StepHeading } from "./styles";

// For the project confirmation flow each step is definied as a route in the arrow below.
// We use a route config to make animating betweent the steps easier.
const routes = [
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
    component: NiceToHaveCharacteristics,
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
  }
]

// Returns the route config for the current step based on the current URL
const currentRoute = () => {
  const path = window.location.pathname
  return find(routes, route => {
    return path.indexOf(route.path) > -1
  })
}

export default ({ match }) => {
  const route = currentRoute() || {};
  const number = routes.indexOf(route) + 1

  return (
    <div>
      <Step>Step {number} of 9</Step>
      <StepHeading>{route.title}</StepHeading>
      <Progress amount={(number / (routes.length + 1)) * 100} />
      <Switch>
        {routes.map(route => (
          <Route key={route.path} path={`${match.path}${route.path}`} component={route.component} />
        ))}
        <Redirect to={`${match.path}/deposit`} />
      </Switch>
    </div>
  )
}