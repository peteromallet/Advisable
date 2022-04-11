import React, { useEffect } from "react";
import { Box, useBackground } from "@advisable/donut";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Shortlist from "./views/Shortlist";
import Shortlists from "./views/Shortlists";
import CaseStudyArticle from "src/views/CaseStudyArticle";
import Page from "src/components/Page";
import ErrorBoundary from "src/components/ErrorBoundary";
import ShortlistArticleSelection from "./views/ShortlistArticleSelection";
import ShortlistSkillCategory from "./views/ShortlistSkillCategory";
import ShortlistGoals from "./views/ShortlistGoals";
import ShortlistName from "./views/ShortlistName";
import AccountConfirmationPrompt from "src/components/AccountConfirmationPrompt";
import useTutorial from "src/hooks/useTutorial";

function Wrapper({ children }) {
  return (
    <Page width="1020px">
      <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
        {children}
      </Box>
    </Page>
  );
}

export default function Discover() {
  useBackground("white");
  const onboarding = useTutorial("onboarding");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!onboarding.isComplete) {
    return <Navigate to="/setup" />;
  }

  return (
    <ErrorBoundary>
      <Wrapper>
        <AccountConfirmationPrompt />
      </Wrapper>
      <Routes>
        <Route
          path="/new/goals"
          element={
            <Wrapper>
              <ShortlistGoals />
            </Wrapper>
          }
        />
        <Route
          path="/new/name"
          element={
            <Wrapper>
              <ShortlistName />
            </Wrapper>
          }
        />
        <Route
          path="/new/:slug"
          element={
            <Wrapper>
              <ShortlistArticleSelection />
            </Wrapper>
          }
        />
        <Route
          path="/new"
          element={
            <Wrapper>
              <ShortlistSkillCategory />
            </Wrapper>
          }
        />
        <Route path="/:id/:articleId" element={<CaseStudyArticle />} />
        <Route
          path="/:id"
          element={
            <Wrapper>
              <Shortlist />
            </Wrapper>
          }
        />
        <Route
          path="/"
          element={
            <Wrapper>
              <Shortlists />
            </Wrapper>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}
