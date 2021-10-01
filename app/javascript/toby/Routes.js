import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "src/components/Route";
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
      <Redirect to={resourcePath(resources[0])} />
    </Switch>
  );
}
