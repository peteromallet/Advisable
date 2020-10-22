import React, { Suspense, lazy } from "react";
import { Switch, Redirect } from "react-router-dom";
import ApplicationProvider from "@advisable-main/components/ApplicationProvider";
import RootErrorBoundary from "@advisable-main/views/RootErrorBoundary";
import Loading from "@advisable-main/components/Loading";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

const Feed = lazy(() => import("./views/Feed"));
const Post = lazy(() => import("./views/Post"));
const Messages = lazy(() => import("./views/Messages"));

const App = () => {
  return (
    <ApplicationProvider>
      <RootErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Switch>
            <AuthenticatedRoute
              exact
              path="/"
              component={() => <Redirect to="/feed" />}
            />
            <AuthenticatedRoute exact path="/feed" component={Feed} />
            <AuthenticatedRoute exact path="/posts/:postId" component={Post} />
            <AuthenticatedRoute
              exact
              path={"/messages/:conversationId?"}
              component={Messages}
            />
          </Switch>
        </Suspense>
      </RootErrorBoundary>
    </ApplicationProvider>
  );
};

export default App;
