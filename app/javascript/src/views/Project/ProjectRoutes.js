import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Inbox from "./Inbox";
import Candidates from "./Candidates";
import CandidateDetails from "./CandidateDetails";

export default function ProjectRoutes({ project }) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <Inbox project={project} />
      </Route>
      <Route path={`${path}/candidates/:applicationId`}>
        <CandidateDetails project={project} />
      </Route>
      <Route path={`${path}/candidates`}>
        <Candidates project={project} />
      </Route>
      <Route path={`${path}/settings`}>Settings</Route>
      <Route path="*">Not Found</Route>
    </Switch>
  );
}
