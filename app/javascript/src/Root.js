import React from "react";
import { hot, setConfig } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";

import Project from "./views/Project";
import NotFound from "./views/NotFound";
import ViewOffer from "./views/ViewOffer";
import ProjectSetup from "./views/ProjectSetup";
import Availability from "./views/Availability";
import EditProposal from "./views/EditProposal";
import CreateProposal from "./views/CreateProposal";
import InterviewRequest from "./views/InterviewRequest"

setConfig({ pureSFC: true })

const Root = () => (
  <Switch>
    <Route path="/project_setup/:projectID" component={ProjectSetup} />
    <Route path="/projects/:projectID" component={Project} />
    <Route path="/offers/:bookingID" component={ViewOffer} />
    <Route path="/clients/:userID/availability" component={Availability} />
    <Route
      path="/interview_request/:interviewID"
      component={InterviewRequest}
    />
    <Route
      path="/applications/:applicationID/proposal"
      component={CreateProposal}
    />
    <Route
      path="/applications/:applicationID/proposals/:proposalID"
      component={EditProposal}
    />
    <Route component={NotFound} />
  </Switch>
);

export default hot(module)(Root);
