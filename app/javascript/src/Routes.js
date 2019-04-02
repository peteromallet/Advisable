import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import Loading from "src/components/Loading";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Project from "./views/Project";
import Login from "./views/Login";
import Signup from "./views/Signup";
import RootPath from "./views/RootPath";
import Projects from "./views/Projects";
import ViewOffer from "./views/ViewOffer";
import References from "./views/References";
import JobListing from "./views/JobListing";
import Applications from "./views/Applications";
import ProjectSetup from "./views/ProjectSetup";
import Availability from "./views/Availability";
import EditProposal from "./views/EditProposal";
import CreateProposal from "./views/CreateProposal";
import ApplicationFlow from "./views/ApplicationFlow";
import InterviewRequest from "./views/InterviewRequest";
import UpdateProfile from "./views/UpdateProfile";
import NotFound from "./views/NotFound";

const ResetPassword = lazy(() => import("./views/ResetPassword"));
const ConfirmAccount = lazy(() => import("./views/ConfirmAccount"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Switch>
          <AuthenticatedRoute exact path="/" component={RootPath} />
          <Route path="/login" component={Login} />
          <Route
            path="/reset_password"
            render={props => <ResetPassword {...props} />}
          />
          <Route
            path="/confirm_account/:token"
            render={props => <ConfirmAccount {...props} />}
          />
          <Route path="/signup/:id" component={Signup} />
          <Route path="/project_setup/:projectID?" component={ProjectSetup} />
          <Route path="/projects/:projectID" component={Project} />
          <AuthenticatedRoute path="/projects" component={Projects} />
          <Route path="/offers/:bookingID" component={ViewOffer} />
          <Route
            path="/clients/:userID/availability"
            component={Availability}
          />
          <Route
            path="/specialists/:specialistID/references"
            component={References}
          />
          <Route
            path="/interview_request/:interviewID"
            component={InterviewRequest}
          />
          <Route
            path="/applications/:applicationID/proposals/:proposalID"
            component={EditProposal}
          />
          <Route
            path="/applications/:applicationID/proposal"
            component={CreateProposal}
          />
          <Route exact path="/invites/:applicationId" component={JobListing} />
          <Route
            path="/invites/:applicationId/apply"
            component={ApplicationFlow}
          />
          <Route
            path="/applications/:applicationID/proposals/:proposalID"
            component={EditProposal}
          />

          <AuthenticatedRoute
            freelancerRoute
            path="/applications"
            component={Applications}
          />

          <AuthenticatedRoute
            freelancerRoute
            path="/profile"
            component={UpdateProfile}
          />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
