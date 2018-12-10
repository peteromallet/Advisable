import React, { Suspense, lazy } from "react";
import { hot, setConfig } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";

import Loading from 'src/components/Loading';
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Project from "./views/Project";
import Login from "./views/Login";
import Setup from "./views/Setup";
import Signup from "./views/Signup";
import RootPath from "./views/RootPath";
import Projects from "./views/Projects";
import Applicant from "./views/Applicant";
import ViewOffer from "./views/ViewOffer";
import CreateOffer from "./views/CreateOffer";
import CounterOffer from "./views/CounterOffer";
import ViewProposal from "./views/ViewProposal";
import ProjectSetup from "./views/ProjectSetup";
import Availability from "./views/Availability";
import EditProposal from "./views/EditProposal";
import NotFoundError from "./views/NotFound/error";
import CreateProposal from "./views/CreateProposal";
import InterviewRequest from "./views/InterviewRequest";
import NotFoundBoundary from "./views/NotFound/NotFoundBoundary";
import InterviewAvailability from "./views/InterviewAvailability";

const ResetPassword = lazy(() => import("./views/ResetPassword"));
const ConfirmAccount = lazy(() => import("./views/ConfirmAccount"));

setConfig({ pureSFC: true });

const Root = () => (
  <NotFoundBoundary>
    <Suspense fallback={Loading}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/reset_password" component={ResetPassword} />
        <AuthenticatedRoute path="/setup" component={Setup} />
        <AuthenticatedRoute exact path="/" component={RootPath} />
        <Route path="/confirm_account/:token" component={ConfirmAccount} />
        <Route path="/project_setup/:projectID" component={ProjectSetup} />
        <Route
          path="/projects/:projectID/applications/:applicationID/offer"
          component={CreateOffer}
        />
        <Route
          path="/projects/:projectID/applications/:applicationID"
          component={Applicant}
        />
        <Route
          path="/projects/:projectID/proposals/:bookingID"
          component={ViewProposal}
        />
        <Route
          path="/projects/:projectID/offers/:bookingID"
          component={CounterOffer}
        />
        <Route
          path="/projects/:projectID/interviews/:interviewID/availability"
          component={InterviewAvailability}
        />
        <AuthenticatedRoute path="/projects/:projectID" component={Project} />
        <AuthenticatedRoute path="/projects" component={Projects} />
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
        <Route
          render={() => {
            throw new NotFoundError();
          }}
        />
      </Switch>
    </Suspense>
  </NotFoundBoundary>
);

export default hot(module)(Root);
