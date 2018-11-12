// Renders the confirmation steps for an existing project.
import React from "react";
import { Transition } from "react-spring";
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

export default ({ match }) => {
  return (
    <Route
      render={({ location }) => (
        <Transition
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0, position: 'absolute' }}
          keys={location => location.pathname}
          items={location}
        >
          {location => styles => (
            <Switch location={location}>
              <Route
                path={`${match.path}/company_overview`}
                render={route => <CompanyOverview {...styles} {...route} />}
              />
              <Route
                path={`${match.path}/project_overview`}
                component={route => <ProjectOverview {...styles} {...route} />}
              />
              <Route path={`${match.path}/goals`} component={ProjectGoals} />
              <Route
                path={`${match.path}/specialist_overview`}
                component={SpecialistOverview}
              />
              <Route
                path={`${match.path}/must_have`}
                component={MustHaveCharacteristics}
              />
              <Route
                path={`${match.path}/nice_to_have`}
                component={NiceToHaveCharacteristics}
              />
              <Route path={`${match.path}/questions`} component={Questions} />
              <Route path={`${match.path}/terms`} component={Terms} />
              <Route path={`${match.path}/deposit`} component={Deposit} />
              <Redirect to={`${match.url}/company_overview`} />
            </Switch>
          )}
        </Transition>
      )}
    />
  );
};
