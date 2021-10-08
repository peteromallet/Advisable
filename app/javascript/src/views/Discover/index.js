import React, { useEffect } from "react";
import { Box, useBackground } from "@advisable/donut";
import { Switch, useLocation } from "react-router";
import Route from "src/components/Route";
import Shortlist from "./views/Shortlist";
import Shortlists from "./views/Shortlists";
import ShortlistArticle from "./views/ShortlistArticle";
import Page from "src/components/Page";
import ErrorBoundary from "src/components/ErrorBoundary";
import ShortlistArticleSelection from "./views/ShortlistArticleSelection";
import ShortlistSkillCategory from "./views/ShortlistSkillCategory";
import ShortlistGoals from "./views/ShortlistGoals";

export default function Discover() {
  useBackground("white");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <Page width="960px">
        <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
          <Switch>
            <Route path="/explore/new/goals" component={ShortlistGoals} />
            <Route
              path="/explore/new/:slug"
              component={ShortlistArticleSelection}
            />
            <Route path="/explore/new" component={ShortlistSkillCategory} />
            <Route
              path="/explore/:id/:articleId"
              component={ShortlistArticle}
            />
            <Route path="/explore/:id" component={Shortlist} />
            <Route path="/explore" component={Shortlists} />
          </Switch>
        </Box>
      </Page>
    </ErrorBoundary>
  );
}
