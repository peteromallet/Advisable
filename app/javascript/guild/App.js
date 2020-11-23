import React, { Suspense, lazy } from "react";
import { Switch, Redirect, Route, useParams } from "react-router-dom";
import ApplicationProvider from "@advisable-main/components/ApplicationProvider";
import RootErrorBoundary from "@advisable-main/views/RootErrorBoundary";
import Loading from "@advisable-main/components/Loading";
import useViewer from "@advisable-main/hooks/useViewer";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Header from "@guild/components/Header";

const Feed = lazy(() => import("./views/Feed"));
const Post = lazy(() => import("./views/Post"));
const Messages = lazy(() => import("./views/Messages"));
const YourPosts = lazy(() => import("./views/YourPosts"));
const FreelancerProfile = lazy(() =>
  import("@advisable-main/views/FreelancerProfile"),
);

const GuildorRedirectFreelancerProfile = () => {
  const viewer = useViewer();

  if (viewer?.guild) {
    return <FreelancerProfile />;
  } else {
    const { id } = useParams();
    return (window.location.href = `/freelancers/${id}`);
  }
};
const App = () => {
  return (
    <ApplicationProvider>
      <RootErrorBoundary>
        <Header />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              path="/freelancers/:id"
              component={GuildorRedirectFreelancerProfile}
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
            <AuthenticatedRoute exact path="/posts/:postId" component={Post} />
            <AuthenticatedRoute
              exact
              path={"/messages/:conversationId?"}
              component={Messages}
            />
            <AuthenticatedRoute
              exact
              path={"/your-posts"}
              component={YourPosts}
            />
          </Switch>
        </Suspense>
      </RootErrorBoundary>
    </ApplicationProvider>
  );
};

export default App;
