import React, { useEffect } from "react";
import { Box, useBackground } from "@advisable/donut";
import { Route, Routes, useLocation } from "react-router";
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

export default function Discover() {
  useBackground("beige");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <Page width="1020px">
        <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
          <AccountConfirmationPrompt />
          <Routes>
            <Route path="/new/goals" element={<ShortlistGoals />} />
            <Route path="/new/name" element={<ShortlistName />} />
            <Route path="/new/:slug" element={<ShortlistArticleSelection />} />
            <Route path="/new" element={<ShortlistSkillCategory />} />
            <Route path="/:id/:articleId" element={<ShortlistArticle />} />
            <Route path="/:id" element={<Shortlist />} />
            <Route path="/" element={<Shortlists />} />
          </Routes>
        </Box>
      </Page>
    </ErrorBoundary>
  );
}
