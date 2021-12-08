import { Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Route from "src/components/Route";
import Loading from "src/components/Loading";
import RequireAuthentication from "./components/RequireAuthentication";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ApplicationRoutes from "./ApplicationRoutes";
const CaseStudyReview = lazy(() => import("./views/CaseStudyReview"));
const ResetPassword = lazy(() => import("./views/ResetPassword"));
const ConfirmAccount = lazy(() => import("./views/ConfirmAccount"));
const TestimonialFlow = lazy(() => import("./views/TestimonialFlow"));
const Availability = lazy(() => import("./views/Availability"));
const ClientJoin = lazy(() => import("./views/ClientJoin"));
const FreelancerJoin = lazy(() => import("./views/FreelancerJoin"));
const VideoCall = lazy(() => import("./views/VideoCall"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
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
        <Route path="/clients/:userID/availability" exact>
          <RequireAuthentication clientOnly>
            <Availability />
          </RequireAuthentication>
        </Route>
        <Route path="/calls/:id">
          <RequireAuthentication>
            <VideoCall />
          </RequireAuthentication>
        </Route>
        <Route path="/clients/join">
          <ClientJoin />
        </Route>
        <Route path="/freelancers/join">
          <FreelancerJoin />
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
