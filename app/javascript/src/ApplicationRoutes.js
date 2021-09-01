// ApplicationRoutes renders the routes that should be rendered with a header
import queryString from "query-string";
import React, { Suspense, lazy, useMemo } from "react";
import { Switch, Redirect, useLocation } from "react-router-dom";
import Route from "src/components/Route";
import NotFound from "./views/NotFound";
import Header from "./components/Header";
import Loading from "./components/Loading";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Settings from "./views/Settings";
import useViewer from "./hooks/useViewer";

const Proposal = lazy(() => import("./views/Proposal"));
const BookingSetup = lazy(() => import("./views/BookingSetup"));
const Applications = lazy(() => import("./views/Applications"));
const FreelancerApplication = lazy(() =>
  import("./views/FreelancerApplication"),
);
const ClientApplication = lazy(() => import("./views/ClientApplication"));
const FreelancerProjects = lazy(() => import("./views/FreelancerProjects"));
const Projects = lazy(() => import("./views/Projects"));
const Project = lazy(() => import("./views/Project"));
const Booking = lazy(() => import("./views/Booking"));
const JobListing = lazy(() => import("./views/JobListing"));
const JobOpportunity = lazy(() => import("./views/JobOpportunity"));
const ApplicationFlow = lazy(() => import("./views/ApplicationFlow"));
const ActiveTalent = lazy(() => import("./views/ActiveTalent"));
const Messages = lazy(() => import("./views/Messages"));
const FreelancerProfile = lazy(() => import("./views/FreelancerProfile"));
const FreelancerActiveApplication = lazy(() =>
  import("./views/FreelancerActiveApplication"),
);
const RequestConsultation = lazy(() => import("./views/RequestConsultation"));
const Consultation = lazy(() => import("./views/Consultation"));
const Interview = lazy(() => import("./views/Interview"));
const InterviewRequest = lazy(() => import("./views/InterviewRequest"));
const SetPassword = lazy(() => import("./views/SetPassword"));
const CaseStudyRecommendations = lazy(() =>
  import("./views/CaseStudyRecommendations"),
);
const Payment = lazy(() => import("./views/Payment"));
const NewMessages = lazy(() => import("./views/NewMessages"));

function RedirectToFreelancerProfile() {
  const viewer = useViewer();
  return <Redirect to={`/freelancers/${viewer.id}`} />;
}

function RedirectToSetPassword() {
  const location = useLocation();
  return (
    <Redirect
      to={{
        pathname: "/set_password",
        state: { from: location },
      }}
    />
  );
}

function VersionedRoute({ fallback, versions, ...props }) {
  const location = useLocation();
  const versionNumber = useMemo(() => {
    const { version } = queryString.parse(location.search);
    if (version) sessionStorage.setItem(props.path, version);
    return sessionStorage.getItem(props.path);
  }, [location, props.path]);

  const component = versions[versionNumber] || fallback;
  return <AuthenticatedRoute {...props} component={component} />;
}

const ApplicationRoutes = () => {
  const viewer = useViewer();
  const location = useLocation();

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <AuthenticatedRoute path="/set_password" component={SetPassword} />
          {viewer?.needsToSetAPassword ? <RedirectToSetPassword /> : null}
          <Redirect
            from="/clients/signup"
            to={{ ...location, pathname: "/clients/join" }}
          />
          <VersionedRoute
            name="messages"
            path="/messages"
            fallback={Messages}
            versions={{ 2: NewMessages }}
          />
          <AuthenticatedRoute
            path="/clients/apply"
            component={ClientApplication}
          />
          <AuthenticatedRoute
            path="/freelancers/apply"
            component={FreelancerApplication}
          />
          <Route path="/freelancers/:id" component={FreelancerProfile} />
          {/* Client routes */}
          <Redirect
            from="/project_setup/:projectID"
            to="/projects/:projectID"
          />
          <AuthenticatedRoute
            specialistOnly
            path="/interview_request/:interviewID"
            component={InterviewRequest}
          />
          {/* maintain old interview availability routes */}
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
            clientOnly
            path="/manage/:applicationId"
            component={Booking}
          />
          <Route
            path="/request_consultation/:specialistId"
            component={RequestConsultation}
          />
          {/* Freelancer Routes */}
          <AuthenticatedRoute
            specialistOnly
            path="/consultations/:id"
            component={Consultation}
          />
          <AuthenticatedRoute
            exact
            specialistOnly
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
          <AuthenticatedRoute
            exact
            specialistOnly
            path="/invites/:applicationId"
            component={JobListing}
          />
          <AuthenticatedRoute
            exact
            specialistOnly
            path="/opportunities/:projectId"
            component={JobOpportunity}
          />
          <AuthenticatedRoute
            specialistOnly
            path="/invites/:applicationId/apply"
            component={ApplicationFlow}
          />
          <AuthenticatedRoute path="/settings" component={Settings} />
          <AuthenticatedRoute
            path="/profile"
            component={RedirectToFreelancerProfile}
          />
          <AuthenticatedRoute
            clientOnly
            path="/explore"
            component={CaseStudyRecommendations}
          />
          <AuthenticatedRoute
            clientOnly
            path="/payments/:id"
            component={Payment}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
};

export default ApplicationRoutes;
