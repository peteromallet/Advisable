import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Resource from "./views/resource";
import { useResources } from "./components/resources";

export default function Routes() {
  const resources = useResources();

  return (
    <Switch>
      <Route path="/:resourceName">
        <Resource />
      </Route>
      <Redirect to={`/${resources[0].name}`} />
    </Switch>
  );
}
