import React from "react";
import { Box, Stack, useBackground } from "@advisable/donut";
import ErrorBoundary from "src/components/ErrorBoundary";
import Page from "src/components/Page";
import Loading from "src/components/Loading";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import UpcomingEvents from "./components/UpcomingEvents";
import LatestProjects from "./components/LatestProjects";
import CollaborationRequests from "./components/CollaborationRequests";
import { useDashboardData } from "./queries";

export default function FreelancerDashboard() {
  const { data, loading, error } = useDashboardData();
  useBackground("white");

  if (loading) return <Loading />;

  return (
    <ErrorBoundary>
      <Box bg="neutral50">
        <Box
          display={{ _: "block", s: "grid" }}
          gridTemplateColumns={{ _: "44% auto", l: "52% auto" }}
          gridColumnGap={{ _: "16px", l: "48px", xl: "96px" }}
          marginX="auto"
          maxWidth={{ _: "720px", l: "1080px" }}
          paddingY={{ _: 8, m: 12 }}
          paddingX={{ _: 4, m: 8 }}
        >
          <Welcome />
          <Profile
            caseStudies={data.viewer?.caseStudies}
            reviews={data.viewer?.reviews}
          />
        </Box>
      </Box>
      <Page width="1080px">
        <Box
          display={{ _: "block", l: "grid" }}
          paddingY={{ _: 8, m: 12 }}
          paddingX={{ _: 4, m: 8 }}
          gridTemplateColumns="52% auto"
          gridColumnGap={{ l: "48px", xl: "96px" }}
          maxWidth={{ _: "720px", l: "none" }}
          mx="auto"
        >
          <Stack as={Box} spacing={16} mb={16} gridColumn="2" gridRow="1">
            <LatestProjects topCaseStudies={data.topCaseStudies} />
            <UpcomingEvents upcomingEvents={data.upcomingEvents} />
          </Stack>
          <Box gridColumn="1" gridRow="1">
            <CollaborationRequests
              collaborationRequests={data.collaborationRequests.nodes}
            />
          </Box>
        </Box>
      </Page>
    </ErrorBoundary>
  );
}
