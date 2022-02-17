// ApplicationRoutes renders the routes that should be rendered with a header
import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./views/NotFound";
import Header from "./components/Header";
import Loading from "./components/Loading";
import RequireAuthentication from "./components/RequireAuthentication";
import Settings from "./views/Settings";
import useViewer from "./hooks/useViewer";
import Hire from "./views/Hire";
import EditPost from "./views/EditPost";

const Proposal = lazy(() => import("./views/Proposal"));
const BookingSetup = lazy(() => import("./views/BookingSetup"));
const FreelancerDashboard = lazy(() => import("./views/FreelancerDashboard"));
const FreelancerApplication = lazy(() =>
  import("./views/FreelancerApplication"),
);
const ClientApplication = lazy(() => import("./views/ClientApplication"));
const FreelancerProjects = lazy(() => import("./views/FreelancerProjects"));
const Booking = lazy(() => import("./views/Booking"));
const ActiveTalent = lazy(() => import("./views/ActiveTalent"));
const FreelancerProfile = lazy(() => import("./views/FreelancerProfile"));
const FreelancerActiveApplication = lazy(() =>
  import("./views/FreelancerActiveApplication"),
);
const Interview = lazy(() => import("./views/Interview"));
const InterviewRequest = lazy(() => import("./views/InterviewRequest"));
const Payment = lazy(() => import("./views/Payment"));
const Messages = lazy(() => import("./views/Messages"));
const GuildPost = lazy(() => import("./views/Post"));
const GuildFollows = lazy(() => import("guild/views/Follows"));
const GuildEvent = lazy(() => import("guild/views/Event"));
const GuildEvents = lazy(() => import("guild/views/Events"));
const Discover = lazy(() => import("./views/Discover"));
const NewPost = lazy(() => import("./views/NewPost"));
const NewAgreement = lazy(() => import("./views/NewAgreement"));

function RedirectToFreelancerProfile() {
  const viewer = useViewer();
  return <Redirect to={viewer.profilePath} />;
}

const ApplicationRoutes = () => {
  const viewer = useViewer();
  const isClient = viewer && viewer.__typename === "User";

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Switch>
          {isClient && <Redirect from="/" exact to="/explore" />}

          <Route path="/" exact>
            <RequireAuthentication>
              <FreelancerDashboard />
            </RequireAuthentication>
          </Route>

          <Route path="/post">
            <RequireAuthentication specialistOnly>
              <NewPost />
            </RequireAuthentication>
          </Route>

          <Route path="/messages">
            <RequireAuthentication>
              <Messages />
            </RequireAuthentication>
          </Route>

          <Route path="/clients/apply">
            <RequireAuthentication>
              <ClientApplication />
            </RequireAuthentication>
          </Route>

          <Route path="/freelancers/apply">
            <RequireAuthentication>
              <FreelancerApplication />
            </RequireAuthentication>
          </Route>

          <Route path="/profile/:username">
            <FreelancerProfile />
          </Route>

          <Route path="/profile">
            <RequireAuthentication>
              <RedirectToFreelancerProfile />
            </RequireAuthentication>
          </Route>

          <Route path="/interview_request/:interviewID">
            <RequireAuthentication specialistOnly>
              <InterviewRequest />
            </RequireAuthentication>
          </Route>

          <Route path="/interviews/:id">
            <RequireAuthentication>
              <Interview />
            </RequireAuthentication>
          </Route>

          <Route path="/hire">
            <RequireAuthentication clientOnly>
              <Hire />
            </RequireAuthentication>
          </Route>

          <Route exact path="/manage">
            <RequireAuthentication>
              <ActiveTalent />
            </RequireAuthentication>
          </Route>

          <Route path="/book/:applicationId">
            <RequireAuthentication>
              <BookingSetup />
            </RequireAuthentication>
          </Route>

          <Route path="/manage/:applicationId">
            <RequireAuthentication clientOnly>
              <Booking />
            </RequireAuthentication>
          </Route>

          <Route path="/applications/:applicationId/proposal">
            <RequireAuthentication>
              <Proposal />
            </RequireAuthentication>
          </Route>

          <Route exact path="/clients">
            <RequireAuthentication>
              <FreelancerProjects />
            </RequireAuthentication>
          </Route>

          <Route path="/clients/:applicationId">
            <RequireAuthentication>
              <FreelancerActiveApplication />
            </RequireAuthentication>
          </Route>

          <Route path="/settings">
            <RequireAuthentication>
              <Settings />
            </RequireAuthentication>
          </Route>

          <Route path="/explore">
            <RequireAuthentication clientOnly>
              <Discover />
            </RequireAuthentication>
          </Route>

          <Route path="/payments/:id">
            <RequireAuthentication clientOnly>
              <Payment />
            </RequireAuthentication>
          </Route>

          <Route path="/posts/:id/edit">
            <EditPost />
          </Route>

          <Route path="/posts/:postId">
            <GuildPost />
          </Route>

          <Route exact path="/guild/topics">
            <RequireAuthentication specialistOnly>
              <GuildFollows />
            </RequireAuthentication>
          </Route>

          <Route exact path="/events/:eventId">
            <GuildEvent />
          </Route>

          <Route exact path="/events">
            <RequireAuthentication>
              <GuildEvents />
            </RequireAuthentication>
          </Route>

          <Route path="/new_agreement/:userId">
            <RequireAuthentication specialistOnly>
              <NewAgreement />
            </RequireAuthentication>
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};

export default ApplicationRoutes;
