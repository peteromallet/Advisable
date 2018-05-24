import React from "react";
import Project from "./views/Project";
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route } from "react-router-dom";
import ApplicationContainer from './components/ApplicationContainer';

const App = () => (
  <BrowserRouter>
    <ApplicationContainer>
      <Route path="/projects/:projectID" component={Project} />
    </ApplicationContainer>
  </BrowserRouter>
)

export default hot(module)(App)
