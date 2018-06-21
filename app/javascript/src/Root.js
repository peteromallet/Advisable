import React from "react";
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Project from "./views/Project";
import NotFound from "./views/NotFound";

const Root = () => (
  <Switch>
    <Route path="/projects/:projectID" component={Project} />
    <Route component={NotFound} />
  </Switch>
)

export default hot(module)(Root)
