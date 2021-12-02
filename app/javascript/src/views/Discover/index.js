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
import ShortlistName from "./views/ShortlistName";
import AccountConfirmationPrompt from "src/components/AccountConfirmationPrompt";
import ClientApplicationPrompt from "src/components/ClientApplicationPrompt";
import useViewer from "src/hooks/useViewer";

export default function Discover() {
  useBackground("beige");
  const viewer = useViewer();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <Page width="1020px">
        <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
          <ClientApplicationPrompt />
          <AccountConfirmationPrompt />
          {viewer.isAccepted && (
            <Switch>
              <Route path="/explore/new/goals">
                <ShortlistGoals />
              </Route>
              <Route path="/explore/new/name">
                <ShortlistName />
              </Route>
              <Route path="/explore/new/:slug">
                <ShortlistArticleSelection />
              </Route>
              <Route path="/explore/new">
                <ShortlistSkillCategory />
              </Route>
              <Route path="/explore/:id/:articleId">
                <ShortlistArticle />
              </Route>
              <Route path="/explore/:id">
                <Shortlist />
              </Route>
              <Route path="/explore">
                <Shortlists />
              </Route>
            </Switch>
          )}
        </Box>
      </Page>
    </ErrorBoundary>
  );
}
