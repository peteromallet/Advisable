import React from "react";
import { Switch, Route } from "react-router";
import Profile from "./views/Profile";
import CaseStudy from "./views/CaseStudy";

export default function FreelancerProfileNew() {
  return (
    <Switch>
      <Route path="/freelancers/:specialist_id" component={Profile} exact />
      <Route
        path="/freelancers/:specialist_id/case_studies/:case_study_id"
        component={CaseStudy}
      />
    </Switch>
  );
}
