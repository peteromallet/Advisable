import React from "react";
import styled from "styled-components";
import { Box, useBreakpoint, useTheme } from "@advisable/donut";
import { useLocation } from "react-router-dom";
import SetupDots from "./SetupDots";
import SetupSteps from "./SetupSteps";
import JobSetupSidebar from "./JobSetupSidebar";

const PageWithSidebar = styled.div`
  display: flex;
`;

export default function JobSetup({ data }) {
  const theme = useTheme();
  const location = useLocation();
  const mediumAndUp = useBreakpoint("mUp");
  const largeScreen = useBreakpoint("lUp");

  React.useEffect(() => {
    theme.updateTheme({ background: mediumAndUp ? "default" : "white" });
    return () => theme.updateTheme({ background: "default" });
  }, [mediumAndUp]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <PageWithSidebar>
      {largeScreen && <JobSetupSidebar data={data} />}
      <Box
        mx="auto"
        width="100%"
        position="relative"
        my={{ _: 0, m: "64px" }}
        padding={{ _: "24px", m: "0" }}
        maxWidth={{ _: "100%", m: "680px" }}
      >
        {!largeScreen && data.project.status === "DRAFT" && (
          <SetupDots
            marginBottom={{ _: "m", m: "l" }}
            justifyContent={{ _: "start", m: "center" }}
          />
        )}
        <SetupSteps data={data} />
      </Box>
    </PageWithSidebar>
  );
}
