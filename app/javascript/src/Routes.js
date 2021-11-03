import { Redirect, Switch, useLocation } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import Route from "src/components/Route";
import Loading from "src/components/Loading";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Login from "./views/Login";
import Signup from "./views/Signup";
import RootPath from "./views/RootPath";
import ApplicationRoutes from "./ApplicationRoutes";
const CaseStudyReview = lazy(() => import("./views/CaseStudyReview"));
const ResetPassword = lazy(() => import("./views/ResetPassword"));
const ConfirmAccount = lazy(() => import("./views/ConfirmAccount"));
const VerifyProject = lazy(() => import("./views/VerifyProject"));
const TestimonialFlow = lazy(() => import("./views/TestimonialFlow"));
const Availability = lazy(() => import("./views/Availability"));
const ClientJoin = lazy(() => import("./views/ClientJoin"));
const FreelancerJoin = lazy(() => import("./views/FreelancerJoin"));
const VideoCall = lazy(() => import("./views/VideoCall"));

const Routes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <AuthenticatedRoute exact path="/">
          <RootPath />
        </AuthenticatedRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/reset_password">
          <ResetPassword />
        </Route>
        <Route path="/confirm_account/:token">
          <ConfirmAccount />
        </Route>
        <Route path="/signup/:id">
          <Signup />
        </Route>
        <AuthenticatedRoute
          exact
          clientOnly
          path="/clients/:userID/availability"
        >
          <Availability />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/calls/:id">
          <VideoCall />
        </AuthenticatedRoute>
        <Redirect
          from="/freelancers/signup"
          to={{ pathname: "/freelancers/join", search: location.search }}
        />
        <Route path="/clients/join">
          <ClientJoin />
        </Route>
        <Route path="/freelancers/join">
          <FreelancerJoin />
        </Route>
        <Route path="/verify_project/:id">
          <VerifyProject />
        </Route>
        <Route path="/review/:id/case_studies/:article_id">
          <CaseStudyReview />
        </Route>
        <Route path="/review/:id">
          <TestimonialFlow />
        </Route>
        <Route>
          <ApplicationRoutes />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
