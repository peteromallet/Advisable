import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Inbox from "./Inbox";

export default function ProjectRoutes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <Inbox />
      </Route>
      <Route path={`${path}/applicants`}>Applicants</Route>
      <Route path={`${path}/settings`}>Settings</Route>
      <Route path="*">Not Found</Route>
    </Switch>
  );
}
