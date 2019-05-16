// ApplicationRoutes renders the routes that should be rendered with a header
import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "./views/NotFound";
import Header from "./components/Header";
import Loading from "./components/Loading";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

const Applicant = lazy(() => import("./views/Applicant"));
const Proposal = lazy(() => import("./views/Proposal"));
const Applications = lazy(() => import("./views/Applications"));
const FreelancerProjects = lazy(() => import("./views/FreelancerProjects"));
const UpdateProfile = lazy(() => import("./views/UpdateProfile"));
const Projects = lazy(() => import("./views/Projects"));
const Project = lazy(() => import("./views/Project"));
const Booking = lazy(() => import("./views/Booking"));
const JobListing = lazy(() => import("./views/JobListing"));
const ApplicationFlow = lazy(() => import("./views/ApplicationFlow"));
const ActiveTalent = lazy(() => import("./views/ActiveTalent"));
const InterviewAvailability = lazy(() =>
  import("./views/InterviewAvailability")
);
const FreelancerActiveApplication = lazy(() =>
  import("./views/FreelancerActiveApplication")
);

export default () => (
  <>
    <Header />
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* Client routes */}
        <AuthenticatedRoute
          path="/projects/:projectID/applications/:applicationID"
          component={Applicant}
        />
        <Route
          path="/projects/:projectID/interviews/:interviewID/availability"
          component={InterviewAvailability}
        />
        <Route path="/projects/:projectId/:status?" component={Project} />
        <AuthenticatedRoute path="/projects" component={Projects} />
        <AuthenticatedRoute exact path="/manage" component={ActiveTalent} />
        <AuthenticatedRoute path="/manage/:applicationId" component={Booking} />
        {/* Freelancer Routes */}
        <AuthenticatedRoute
          exact
          freelancerRoute
          path="/applications"
          component={Applications}
        />
        <AuthenticatedRoute
          freelancerRoute
          component={Proposal}
          path={"/applications/:applicationId/proposal"}
        />
        <AuthenticatedRoute
          exact
          freelancerRoute
          path="/clients"
          component={FreelancerProjects}
        />
        <AuthenticatedRoute
          freelancerRoute
          path="/clients/:applicationId"
          component={FreelancerActiveApplication}
        />
        <AuthenticatedRoute
          freelancerRoute
          path="/profile"
          component={UpdateProfile}
        />
        <Route exact path="/invites/:applicationId" component={JobListing} />
        <Route
          path="/invites/:applicationId/apply"
          component={ApplicationFlow}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </>
);
