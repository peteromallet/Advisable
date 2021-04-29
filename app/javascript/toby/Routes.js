import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "src/components/Route";
import Resource from "./views/resource";
import { useSchema } from "./components/schema";
import { pluralizeType } from "./utilities";

export default function Routes() {
  const { resources } = useSchema();

  return (
    <Switch>
      {resources.map((resource) => (
        <Route key={resource.type} path={`/${pluralizeType(resource.type)}`}>
          <Resource resource={resource} />
        </Route>
      ))}
      <Redirect to={`/${pluralizeType(resources[0].type)}`} />
    </Switch>
  );
}
