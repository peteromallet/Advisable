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
import Hire from "./views/Hire";

const Proposal = lazy(() => import("./views/Proposal"));
const BookingSetup = lazy(() => import("./views/BookingSetup"));
const Applications = lazy(() => import("./views/Applications"));
const FreelancerApplication = lazy(() =>
  import("./views/FreelancerApplication"),
);
const ClientApplication = lazy(() => import("./views/ClientApplication"));
const FreelancerProjects = lazy(() => import("./views/FreelancerProjects"));
const Booking = lazy(() => import("./views/Booking"));
const JobListing = lazy(() => import("./views/JobListing"));
const ApplicationFlow = lazy(() => import("./views/ApplicationFlow"));
const ActiveTalent = lazy(() => import("./views/ActiveTalent"));
const FreelancerProfile = lazy(() => import("./views/FreelancerProfile"));
const FreelancerActiveApplication = lazy(() =>
  import("./views/FreelancerActiveApplication"),
);
const Consultation = lazy(() => import("./views/Consultation"));
const Interview = lazy(() => import("./views/Interview"));
const InterviewRequest = lazy(() => import("./views/InterviewRequest"));
const CaseStudy = lazy(() => import("./views/CaseStudy"));
const SetPassword = lazy(() => import("./views/SetPassword"));
const Payment = lazy(() => import("./views/Payment"));
const Messages = lazy(() => import("./views/Messages"));
const GuildFeed = lazy(() => import("guild/views/Feed"));
const GuildPost = lazy(() => import("guild/views/Post"));
const GuildFollows = lazy(() => import("guild/views/Follows"));
const GuildEvent = lazy(() => import("guild/views/Event"));
const GuildEvents = lazy(() => import("guild/views/Events"));
const Discover = lazy(() => import("./views/Discover"));

function RedirectToFreelancerProfile() {
  const viewer = useViewer();
  return <Redirect to={`/freelancers/${viewer.username || viewer.id}`} />;
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

export function VersionedRoute({
  fallback,
  versions,
  routeComponent = AuthenticatedRoute,
  ...props
}) {
  const location = useLocation();
  const versionNumber = useMemo(() => {
    const { version } = queryString.parse(location.search);
    if (version) sessionStorage.setItem(props.path, version);
    return sessionStorage.getItem(props.path);
  }, [location, props.path]);

  const component = versions[versionNumber] || fallback;
  return React.createElement(routeComponent, {
    ...props,
    component,
  });
}

const ApplicationRoutes = () => {
  const viewer = useViewer();
  const location = useLocation();

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          <AuthenticatedRoute path="/set_password">
            <SetPassword />
          </AuthenticatedRoute>
          {viewer?.needsToSetAPassword ? <RedirectToSetPassword /> : null}
          <Redirect
            from="/clients/signup"
            to={{ ...location, pathname: "/clients/join" }}
          />
          <Route path="/case_studies/:id">
            <CaseStudy />
          </Route>
          <AuthenticatedRoute path="/messages">
            <Messages />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/clients/apply">
            <ClientApplication />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/freelancers/apply">
            <FreelancerApplication />
          </AuthenticatedRoute>
          <Route path="/freelancers/:username">
            <FreelancerProfile />
          </Route>
          {/* Client routes */}
          <Redirect
            from="/project_setup/:projectID"
            to="/projects/:projectID"
          />
          <AuthenticatedRoute
            specialistOnly
            path="/interview_request/:interviewID"
          >
            <InterviewRequest />
          </AuthenticatedRoute>
          {/* maintain old interview availability routes */}
          <Redirect
            from="/projects/:projectID/interviews/:interviewID/availability"
            to="/interviews/:interviewID"
          />
          <AuthenticatedRoute path="/interviews/:id">
            <Interview />
          </AuthenticatedRoute>
          <Redirect
            from="/projects/:projectId/candidates/:id/proposal"
            to="/hire/proposals/:id"
          />
          <Redirect from="/projects" to="/hire" />
          <AuthenticatedRoute clientOnly path="/hire">
            <Hire />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/manage">
            <ActiveTalent />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/book/:applicationId">
            <BookingSetup />
          </AuthenticatedRoute>
          <AuthenticatedRoute clientOnly path="/manage/:applicationId">
            <Booking />
          </AuthenticatedRoute>
          <Redirect
            from="/request_consultation/:specialistId"
            to="/freelancers/:specialistId"
          />
          {/* Freelancer Routes */}
          <AuthenticatedRoute specialistOnly path="/consultations/:id">
            <Consultation />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact specialistOnly path="/applications">
            <Applications />
          </AuthenticatedRoute>
          <AuthenticatedRoute path={"/applications/:applicationId/proposal"}>
            <Proposal />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/clients">
            <FreelancerProjects />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/clients/:applicationId">
            <FreelancerActiveApplication />
          </AuthenticatedRoute>
          <AuthenticatedRoute
            exact
            specialistOnly
            path="/invites/:applicationId"
          >
            <JobListing />
          </AuthenticatedRoute>
          <AuthenticatedRoute
            specialistOnly
            path="/invites/:applicationId/apply"
          >
            <ApplicationFlow />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/settings">
            <Settings />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/profile">
            <RedirectToFreelancerProfile />
          </AuthenticatedRoute>
          <AuthenticatedRoute clientOnly path="/explore">
            <Discover />
          </AuthenticatedRoute>
          <AuthenticatedRoute clientOnly path="/payments/:id">
            <Payment />
          </AuthenticatedRoute>
          <Route specialistOnly path="/guild/posts/:postId">
            <GuildPost />
          </Route>
          <AuthenticatedRoute exact path="/guild/topics" specialistOnly>
            <GuildFollows />
          </AuthenticatedRoute>
          <Route exact path="/events/:eventId">
            <GuildEvent />
          </Route>
          <AuthenticatedRoute exact path="/events">
            <GuildEvents />
          </AuthenticatedRoute>
          <Redirect from="/guild/events/:eventId" to="/events/:eventId" />
          <AuthenticatedRoute path="/guild" specialistOnly>
            <GuildFeed />
          </AuthenticatedRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default ApplicationRoutes;
