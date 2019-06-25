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
const Messages = lazy(() => import("./views/Messages"));
const InterviewAvailability = lazy(() =>
  import("./views/InterviewAvailability")
);
const FreelancerActiveApplication = lazy(() =>
  import("./views/FreelancerActiveApplication")
);

const ApplicationRoutes = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <AuthenticatedRoute exact path="/messages" component={Messages} />
          {/* Client routes */}
          <AuthenticatedRoute
            component={Applicant}
            path="/projects/:projectID/applications/:applicationID"
          />
          <Route
            path="/projects/:projectID/interviews/:interviewID/availability"
            component={InterviewAvailability}
          />
          <Route path="/projects/:projectId/:status?" component={Project} />
          <AuthenticatedRoute as="User" path="/projects" component={Projects} />
          <AuthenticatedRoute exact path="/manage" component={ActiveTalent} />
          <AuthenticatedRoute
            path="/manage/:applicationId"
            component={Booking}
          />
          {/* Freelancer Routes */}
          <AuthenticatedRoute
            exact
            path="/applications"
            component={Applications}
          />
          <AuthenticatedRoute
            component={Proposal}
            path={"/applications/:applicationId/proposal"}
          />
          <AuthenticatedRoute
            exact
            path="/clients"
            component={FreelancerProjects}
          />
          <AuthenticatedRoute
            path="/clients/:applicationId"
            component={FreelancerActiveApplication}
          />
          <AuthenticatedRoute path="/profile" component={UpdateProfile} />
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
};

export default ApplicationRoutes;
