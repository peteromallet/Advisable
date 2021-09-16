import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "src/components/Route";
import Resource from "./views/resource";
import { useSchema } from "./components/schema";
import { resourcePath } from "./utilities";

export default function Routes() {
  const { resources } = useSchema();

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
