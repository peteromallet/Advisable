// ApplicationRoutes renders the routes that should be rendered with a header
import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./views/NotFound";
import Header from "./components/Header";
import Loading from "./components/Loading";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Settings from "./views/Settings";

const Proposal = lazy(() => import("./views/Proposal"));
const BookingSetup = lazy(() => import("./views/BookingSetup"));
const Applications = lazy(() => import("./views/Applications"));
const ClientSignup = lazy(() => import("./views/ClientSignup"));
const FreelancerProjects = lazy(() => import("./views/FreelancerProjects"));
const UpdateProfile = lazy(() => import("./views/UpdateProfile"));
const Projects = lazy(() => import("./views/Projects"));
const Project = lazy(() => import("./views/Project"));
const Booking = lazy(() => import("./views/Booking"));
const JobListing = lazy(() => import("./views/JobListing"));
const JobOpportunity = lazy(() => import("./views/JobOpportunity"));
const ApplicationFlow = lazy(() => import("./views/ApplicationFlow"));
const ActiveTalent = lazy(() => import("./views/ActiveTalent"));
const Messages = lazy(() => import("./views/Messages"));
const FreelancerSearch = lazy(() => import("./views/FreelancerSearch"));
const FreelancerProfile = lazy(() => import("./views/FreelancerProfile"));
const InterviewAvailability = lazy(() =>
  import("./views/InterviewAvailability"),
);
const FreelancerActiveApplication = lazy(() =>
  import("./views/FreelancerActiveApplication"),
);
const RequestConsultation = lazy(() => import("./views/RequestConsultation"));
const Consultation = lazy(() => import("./views/Consultation"));
const ProjectSetup = lazy(() => import("./views/ProjectSetup"));
const FullApplication = lazy(() => import("./views/FullApplication"));
const Interview = lazy(() => import("./views/Interview"));
const InterviewRequest = lazy(() => import("./views/InterviewRequest"));

const ApplicationRoutes = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/clients/signup" component={ClientSignup} />
          <AuthenticatedRoute exact path="/messages" component={Messages} />
          <Route path="/freelancers/:id" component={FreelancerProfile} />
          {/* Client routes */}
          <Route path="/project_setup/:projectID?" component={ProjectSetup} />
          <AuthenticatedRoute
            specialistOnly
            path="/interview_request/:interviewID"
            component={InterviewRequest}
          />
          <Redirect
            from="/projects/:projectID/interviews/:interviewID/availability"
            to="/interviews/:interviewID"
          />
          <AuthenticatedRoute path="/interviews/:id" component={Interview} />
          <Route path="/projects/:id" component={Project} />
          <AuthenticatedRoute
            clientOnly
            path="/projects"
            component={Projects}
          />
          <AuthenticatedRoute exact path="/manage" component={ActiveTalent} />
          <AuthenticatedRoute
            path="/book/:applicationId"
            component={BookingSetup}
          />
          <AuthenticatedRoute
            path="/manage/:applicationId"
            component={Booking}
          />
          <Route
            path="/request_consultation/:specialistId"
            component={RequestConsultation}
          />
          <AuthenticatedRoute
            path="/freelancer_search"
            component={FreelancerSearch}
          />
          {/* Freelancer Routes */}
          <Route path="/consultations/:id" component={Consultation} />
          <AuthenticatedRoute
            exact
            specialistOnly
            path="/applications"
            component={Applications}
          />
          <AuthenticatedRoute
            specialistOnly
            path="/apply"
            component={FullApplication}
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
          <AuthenticatedRoute
            specialistOnly
            path="/profile"
            component={UpdateProfile}
          />
          <Route exact path="/invites/:applicationId" component={JobListing} />
          <AuthenticatedRoute
            exact
            specialistOnly
            path="/opportunities/:projectId"
            component={JobOpportunity}
          />
          <Route
            path="/invites/:applicationId/apply"
            component={ApplicationFlow}
          />
          <AuthenticatedRoute path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
};

export default ApplicationRoutes;
