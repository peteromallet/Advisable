import React from "react";
import { Switch, Route, Redirect } from "react-router";
import CaseStudy from "./CaseStudy";
import RecommendationsInbox from "./Inbox";

export default function CaseStudyRecommendations() {
  return (
    <Switch>
      <Route path="/explore" exact>
        searches
      </Route>
      <Route
        path="/explore/:id/(inbox|archived)"
        component={RecommendationsInbox}
      />
      <Route path="/explore/:id/:caseStudyId" component={CaseStudy} />
      <Redirect from="/explore/:id" to="/explore/:id/inbox" />
      <Redirect to="/explore" />
    </Switch>
  );
}
