import React from "react";
import { Box } from "@advisable/donut";
import Page from "src/components/Page";
import Loading from "src/components/Loading";
import CollaborationRequests from "./components/CollaborationRequests";
import UpcomingEvents from "./components/UpcomingEvents";
import LatestProjects from "./components/LatestProjects";
import { useDashboardData } from "./queries";

export default function FreelancerDashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Loading />;

  return (
    <Page width="1080px">
      <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
        <CollaborationRequests
          collaborationRequests={data.collaborationRequests.nodes}
        />
        <LatestProjects topCaseStudies={data.topCaseStudies} />
        <UpcomingEvents upcomingEvents={data.upcomingEvents} />
      </Box>
    </Page>
  );
}
