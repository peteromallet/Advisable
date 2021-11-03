import React from "react";
import { Box, Stack, useBackground } from "@advisable/donut";
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
    <>
      <Box bg="neutral50">
        <Box
          display={{ _: "block", l: "grid" }}
          gridTemplateColumns="52% auto"
          gridColumnGap={{ l: "48px", xl: "96px" }}
          marginX="auto"
          width="1080px"
          maxWidth={{ _: "720px", l: "none" }}
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
          <CollaborationRequests
            collaborationRequests={data.collaborationRequests.nodes}
          />
          <Stack spacing={16}>
            <LatestProjects topCaseStudies={data.topCaseStudies} />
            <UpcomingEvents upcomingEvents={data.upcomingEvents} />
          </Stack>
        </Box>
      </Page>
    </>
  );
}
