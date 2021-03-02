import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Resource from "./views/resource";
import { useSchema } from "./components/schema";
import { pluralizeType } from "./utilities";

export default function Routes() {
  const { resources } = useSchema();

  return (
    <Switch>
      <Route path="/:resource">
        <Resource />
      </Route>
      <Redirect to={`/${pluralizeType(resources[0].type)}`} />
    </Switch>
  );
}
