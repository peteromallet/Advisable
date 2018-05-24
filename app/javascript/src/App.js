import React from "react";
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Project from "./views/Project";
import NotFound from "./views/NotFound";
import ApplicationContainer from './components/ApplicationContainer';

const App = () => (
  <BrowserRouter>
    <ApplicationContainer>
      <Switch>
        <Route path="/projects/:projectID" component={Project} />
        <Route component={NotFound} />
      </Switch>
    </ApplicationContainer>
  </BrowserRouter>
)

export default hot(module)(App)
