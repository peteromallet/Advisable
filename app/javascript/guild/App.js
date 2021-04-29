import React, { Suspense, lazy } from "react";
import { Switch, Redirect, useParams } from "react-router-dom";
import Route from "src/components/Route";
import ApplicationProvider from "@advisable-main/components/ApplicationProvider";
import RootErrorBoundary from "@advisable-main/views/RootErrorBoundary";
import Loading from "@advisable-main/components/Loading";
import useViewer from "@advisable-main/hooks/useViewer";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Header from "@guild/components/Header";
import { NotificationsProvider } from "components/Notifications";
import useHideIntercom from "src/hooks/useHideIntercom";

import Feed from "./views/Feed";
import Post from "./views/Post";
import Messages from "./views/Messages";
import Events from "./views/Events";
import Event from "./views/Event";
import TwilioProvider from "./components/TwilioProvider";
const YourPosts = lazy(() => import("./views/YourPosts"));
const FreelancerProfile = lazy(() =>
  import("@advisable-main/views/FreelancerProfile"),
);
const Follows = lazy(() => import("./views/Follows"));

const GuildOrRedirectFreelancerProfile = () => {
  const { id } = useParams();
  const viewer = useViewer();

  if (viewer?.guild) {
    return <FreelancerProfile />;
  } else {
    return (window.location.href = `/freelancers/${id}`);
  }
};

function HideIntercom() {
  useHideIntercom();
  return null;
}

const App = () => {
  return (
    <ApplicationProvider>
      <RootErrorBoundary>
        <HideIntercom />
        <NotificationsProvider>
          <TwilioProvider>
            <Header />
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route
                  path="/freelancers/:id"
                  component={GuildOrRedirectFreelancerProfile}
                />
                <AuthenticatedRoute
                  exact
                  path="/"
                  component={() => <Redirect to="/feed" />}
                />
                <AuthenticatedRoute
                  exact
                  path={["/feed", "/composer*"]}
                  component={Feed}
                />
                <Route exact path="/posts/:postId" component={Post} />
                <AuthenticatedRoute
                  exact
                  path="/messages/:conversationId?"
                  component={Messages}
                />
                <AuthenticatedRoute
                  exact
                  path="/your-posts"
                  component={YourPosts}
                />
                <AuthenticatedRoute
                  exact
                  path="/topics/:topicId"
                  component={Feed}
                />
                <AuthenticatedRoute exact path="/follows" component={Follows} />
                <AuthenticatedRoute
                  exact
                  path="/events/:eventId"
                  component={Event}
                />
                <AuthenticatedRoute exact path="/events" component={Events} />
              </Switch>
            </Suspense>
          </TwilioProvider>
        </NotificationsProvider>
      </RootErrorBoundary>
    </ApplicationProvider>
  );
};

export default App;
