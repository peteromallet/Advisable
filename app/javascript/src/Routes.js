import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

import Loading from "src/components/Loading";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Login from "./views/Login";
import Signup from "./views/Signup";
import RootPath from "./views/RootPath";
import References from "./views/References";
import ProjectSetup from "./views/ProjectSetup";
import Availability from "./views/Availability";
import InterviewRequest from "./views/InterviewRequest";
import ApplicationRoutes from "./ApplicationRoutes";

const ResetPassword = lazy(() => import("./views/ResetPassword"));
const ConfirmAccount = lazy(() => import("./views/ConfirmAccount"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Switch>
          <AuthenticatedRoute exact path="/" component={RootPath} />
          <Route path="/login" component={Login} />
          <Route
            path="/reset_password"
            render={props => <ResetPassword {...props} />}
          />
          <Route
            path="/confirm_account/:token"
            render={props => <ConfirmAccount {...props} />}
          />
          <Route path="/signup/:id" component={Signup} />
          <Route path="/project_setup/:projectID?" component={ProjectSetup} />
          <Route
            exact
            path="/clients/:userID/availability"
            component={Availability}
          />
          <Route
            path="/specialists/:specialistID/references"
            component={References}
          />
          <Route
            path="/interview_request/:interviewID"
            component={InterviewRequest}
          />

          <Route component={ApplicationRoutes} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
