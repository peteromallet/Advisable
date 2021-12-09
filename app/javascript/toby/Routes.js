import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Resource from "./views/resource";
import { resourcePath } from "./utilities";
import { useResources } from "./components/resources";

export default function Routes() {
  const resources = useResources();

  return (
    <Switch>
      {resources.map((resource) => (
        <Route key={resource.type} path={resourcePath(resource)}>
          <Resource resource={resource} />
        </Route>
      ))}
      <Route path="*">
        <Redirect to={resourcePath(resources[0])} />
      </Route>
    </Switch>
  );
}
