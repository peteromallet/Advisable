import React from "react";
import { Box } from "@advisable/donut";
import { useBackground } from "@advisable/donut";
import Page from "src/components/Page";
import FreelancerApplicationPrompt from "src/components/FreelancerApplicationPrompt";
import Dashboard from "./views/Dashboard";
import ErrorBoundary from "src/components/ErrorBoundary";
import useViewer from "src/hooks/useViewer";

export default function FreelancerDashboard() {
  const viewer = useViewer();
  useBackground("white");

  return (
    <ErrorBoundary>
      {viewer.isAccepted ? (
        <Dashboard />
      ) : (
        <Page width="1080px">
          <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
            <FreelancerApplicationPrompt />
          </Box>
        </Page>
      )}
    </ErrorBoundary>
  );
}
