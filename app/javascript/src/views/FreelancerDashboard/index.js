import React from "react";
import { Box } from "@advisable/donut";
import Page from "src/components/Page";
import Loading from "src/components/Loading";
import CollaborationRequests from "./components/CollaborationRequests";
import UpcomingEvents from "./components/UpcomingEvents";
import LatestProjects from "./components/LatestProjects";
import { useDashboardData } from "./queries";
import css from "@styled-system/css";

export default function FreelancerDashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Loading />;

  return (
    <Page width="1080px">
      <Box
        paddingY={{ _: 8, m: 12 }}
        paddingX={{ _: 4, m: 8 }}
        display={{ _: "block", l: "grid" }}
        gridTemplateColumns="52% auto"
        flexDirection="row"
        maxWidth={{ _: "720px", l: "none" }}
        mx="auto"
        css={css({
          columnGap: [null, null, null, "48px", "96px"],
        })}
      >
        <Box gridColumn="1">
          <CollaborationRequests
            collaborationRequests={data.collaborationRequests.nodes}
          />
        </Box>
        <Box gridColumn="2">
          <LatestProjects topCaseStudies={data.topCaseStudies} />
          <UpcomingEvents upcomingEvents={data.upcomingEvents} />
        </Box>
      </Box>
    </Page>
  );
}
