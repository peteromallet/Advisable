import React, { useLayoutEffect } from "react";
import { useTheme } from "@advisable/donut";
import { Switch, Route, Redirect } from "react-router";
import CaseStudy from "./CaseStudy";
import Searches from "./Searches";
import RecommendationsInbox from "./Inbox";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import CreateSavedSearch from "./CreateSavedSearch";

export default function CaseStudyRecommendations() {
  const { setTheme } = useTheme();
  const isExploreEnabled = useFeatureFlag("case_studies");

  useLayoutEffect(() => {
    setTheme((t) => ({ ...t, background: "beige" }));
    return () => setTheme((t) => ({ ...t, background: "default" }));
  }, [setTheme]);

  if (!isExploreEnabled) {
    return <Redirect to="/projects" />;
  }

  return (
    <Switch>
      <Route path="/explore" exact>
        <Searches />
      </Route>
      <Route
        path={["/explore/new/:id", "/explore/new"]}
        component={CreateSavedSearch}
      />
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
