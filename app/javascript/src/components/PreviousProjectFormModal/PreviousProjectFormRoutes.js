import React from "react";
import { Switch, Route } from "react-router-dom";
import Overview from "./Overview";
import Portfolio from "./Portfolio";
import Validation from "./Validation";
import MoreInformation from "./MoreInformation";
import UpdateClientDetails from "./UpdateClientDetails";
import CreatePreviousProject from "./CreatePreviousProject";

export default function PreviousProjectFormRoutes() {
  return (
    <Switch>
      <Route path="*previous_projects/new">
        <CreatePreviousProject />
      </Route>
      <Route path="*previous_projects/:id/client">
        <UpdateClientDetails />
      </Route>
      <Route path="*previous_projects/:id/overview">
        <Overview />
      </Route>
      <Route path="*previous_projects/:id/portfolio">
        <Portfolio />
      </Route>
      <Route path="*previous_projects/:id/validation">
        <Validation />
      </Route>
      <Route path="*previous_projects/:id/more">
        <MoreInformation />
      </Route>
    </Switch>
  );
}
