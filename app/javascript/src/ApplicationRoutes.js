// ApplicationRoutes renders the routes that should be rendered with a header
import React, { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./views/NotFound";
import Header from "./components/Header";
import Loading from "./components/Loading";
import RequireAuthentication from "./components/RequireAuthentication";
import Settings from "./views/Settings";
import useViewer from "./hooks/useViewer";
import EditPost from "./views/EditPost";
import Feed from "./views/Feed";
import Article from "./views/CaseStudyArticle";
import ErrorBoundary from "./components/ErrorBoundary";

const FreelancerDashboard = lazy(() => import("./views/FreelancerDashboard"));
const FreelancerApplication = lazy(() =>
  import("./views/FreelancerApplication"),
);
const FreelancerProfile = lazy(() => import("./views/FreelancerProfile"));
const Interview = lazy(() => import("./views/Interview"));
const InterviewRequest = lazy(() => import("./views/InterviewRequest"));
const Payment = lazy(() => import("./views/Payment"));
const Messages = lazy(() => import("./views/Messages"));
const GuildPost = lazy(() => import("./views/Post"));
const GuildFollows = lazy(() => import("guild/views/Follows"));
const GuildEvent = lazy(() => import("guild/views/Event"));
const GuildEvents = lazy(() => import("guild/views/Events"));
const NewPost = lazy(() => import("./views/NewPost"));
const NewAgreement = lazy(() => import("./views/NewAgreement"));
const PaymentRequests = lazy(() => import("./views/PaymentRequests"));

function RedirectToFreelancerProfile() {
  const viewer = useViewer();
  return <Navigate to={viewer.profilePath} />;
}

const ApplicationRoutes = () => {
  const viewer = useViewer();
  const isClient = viewer && viewer.__typename === "User";

  return (
    <>
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            {isClient && (
              <Route
                path="/"
                exact
                element={<Navigate exact to="/explore" />}
              />
            )}

            <Route path="/set_password" element={<Navigate to="/" />} />

            <Route
              path="/"
              exact
              element={
                <RequireAuthentication>
                  <FreelancerDashboard />
                </RequireAuthentication>
              }
            />

            <Route path="/articles/:slug" element={<Article />} />

            <Route
              path="/post"
              element={
                <RequireAuthentication specialistOnly>
                  <NewPost />
                </RequireAuthentication>
              }
            />

            <Route
              path="/messages/*"
              element={
                <RequireAuthentication>
                  <Messages />
                </RequireAuthentication>
              }
            />

            <Route
              path="/freelancers/apply/*"
              element={
                <RequireAuthentication>
                  <FreelancerApplication />
                </RequireAuthentication>
              }
            />

            <Route
              path="/profile/:username/*"
              element={<FreelancerProfile />}
            />

            <Route
              path="/profile"
              element={
                <RequireAuthentication>
                  <RedirectToFreelancerProfile />
                </RequireAuthentication>
              }
            />

            <Route
              path="/interview_request/:interviewID/*"
              element={
                <RequireAuthentication specialistOnly>
                  <InterviewRequest />
                </RequireAuthentication>
              }
            />

            <Route
              path="/interviews/:id/*"
              element={
                <RequireAuthentication>
                  <Interview />
                </RequireAuthentication>
              }
            />

            <Route
              path="/settings/*"
              element={
                <RequireAuthentication>
                  <Settings />
                </RequireAuthentication>
              }
            />

            <Route
              path="/explore/*"
              element={
                <RequireAuthentication clientOnly>
                  <Feed />
                </RequireAuthentication>
              }
            />

            <Route
              path="/payments/:id"
              element={
                <RequireAuthentication clientOnly>
                  <Payment />
                </RequireAuthentication>
              }
            />

            <Route path="/posts/:id/edit" element={<EditPost />} />

            <Route path="/posts/:postId" element={<GuildPost />} />

            <Route
              exact
              path="/guild/topics"
              element={
                <RequireAuthentication specialistOnly>
                  <GuildFollows />
                </RequireAuthentication>
              }
            />

            <Route exact path="/events/:eventId" element={<GuildEvent />} />

            <Route
              exact
              path="/events"
              element={
                <RequireAuthentication>
                  <GuildEvents />
                </RequireAuthentication>
              }
            />

            <Route
              path="/new_agreement/:userId/*"
              element={
                <RequireAuthentication specialistOnly>
                  <NewAgreement />
                </RequireAuthentication>
              }
            />

            <Route
              path="/payment_requests/*"
              element={
                <RequireAuthentication>
                  <PaymentRequests />
                </RequireAuthentication>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ApplicationRoutes;
