import { Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import Loading from "src/components/Loading";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Login from "./views/Login";
import Signup from "./views/Signup";
import RootPath from "./views/RootPath";
import ApplicationRoutes from "./ApplicationRoutes";

const ResetPassword = lazy(() => import("./views/ResetPassword"));
const ConfirmAccount = lazy(() => import("./views/ConfirmAccount"));
const VerifyProject = lazy(() => import("./views/VerifyProject"));
const Availability = lazy(() => import("./views/Availability"));
const FreelancerSignup = lazy(() => import("./views/FreelancerSignup"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <AuthenticatedRoute exact path="/" component={RootPath} />
        <Route path="/login" component={Login} />
        <Route
          path="/reset_password"
          render={(props) => <ResetPassword {...props} />}
        />
        <Route
          path="/confirm_account/:token"
          render={(props) => <ConfirmAccount {...props} />}
        />
        <Route path="/signup/:id" component={Signup} />
        <Route
          exact
          path="/clients/:userID/availability"
          component={Availability}
        />
        <Route path="/freelancers/signup" component={FreelancerSignup} />
        <Route path="/verify_project/:id" component={VerifyProject} />
        <Route component={ApplicationRoutes} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
