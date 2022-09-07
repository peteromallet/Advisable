import React, { Suspense } from "react";
import Sticky from "react-stickynode";
import { Box, Stack, useBreakpoint } from "@advisable/donut";
import Page from "src/components/Page";
import AccountConfirmationPrompt from "src/components/AccountConfirmationPrompt";
import Welcome from "../components/Welcome";
import Profile from "../components/Profile";
import UpcomingEvents from "../components/UpcomingEvents";
import LatestProjects from "../components/LatestProjects";
import CollaborationRequests from "../components/CollaborationRequests";
import { useDashboardData } from "../queries";
import DashboardLoading from "../components/DashboardLoading";

export default function Dashboard() {
  const { data, loading } = useDashboardData();
  const lUp = useBreakpoint("lUp");

  return (
    <>
      <Box bg="neutral50">
        <Box
          display={{ _: "block", s: "grid" }}
          gridTemplateColumns={{ _: "44% auto", l: "52% auto" }}
          gridColumnGap={{ _: "16px", l: "48px", xl: "96px" }}
          marginX="auto"
          maxWidth={{ _: "720px", l: "1080px" }}
          paddingY={{ _: 8, m: 14 }}
          paddingX={{ _: 4, m: 8 }}
        >
          <Welcome unavailableUntil={data?.viewer?.unavailableUntil} />
          <Profile
            loading={loading}
            caseStudies={data?.viewer?.caseStudiesCount}
            reviews={data?.viewer?.reviews?.length}
            unavailableUntil={data?.viewer?.unavailableUntil}
          />
        </Box>
      </Box>
      <Page width="1080px">
        <Box
          paddingY={{ _: 8, m: 12 }}
          paddingX={{ _: 4, m: 8 }}
          maxWidth={{ _: "720px", l: "none" }}
          mx="auto"
        >
          <AccountConfirmationPrompt />
          <Box
            id="dashboardContainer"
            display={{ _: "block", l: "grid" }}
            gridTemplateColumns="52% auto"
            gridColumnGap={{ l: "48px", xl: "96px" }}
          >
            {loading ? (
              <DashboardLoading />
            ) : (
              <Suspense fallback={<DashboardLoading />}>
                <Sticky
                  enabled={lUp}
                  top={84}
                  bottomBoundary="#dashboardContainer"
                >
                  <Stack
                    as={Box}
                    gridColumn="2"
                    gridRow="1"
                    spacing={16}
                    paddingBottom={8}
                    mb={10}
                  >
                    <LatestProjects topCaseStudies={data.topCaseStudies} />
                    <UpcomingEvents upcomingEvents={data.upcomingEvents} />
                  </Stack>
                </Sticky>
              </Suspense>
            )}
            <Box gridColumn="1" gridRow="1">
              <CollaborationRequests />
            </Box>
          </Box>
        </Box>
      </Page>
    </>
  );
}
