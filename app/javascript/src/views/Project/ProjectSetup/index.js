import { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { Box, useBreakpoint, useTheme } from "@advisable/donut";
import { useParams, useLocation } from "react-router-dom";
import Loading from "components/Loading";
import SetupDots from "./SetupDots";
import SetupSteps from "./SetupSteps";
import JobSetupSidebar from "./JobSetupSidebar";
import { GET_JOB } from "./queries";

const PageWithSidebar = styled.div`
  display: flex;
`;

export default function JobSetup() {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_JOB, {
    variables: { id },
  });

  const theme = useTheme();
  const location = useLocation();
  const mediumAndUp = useBreakpoint("mUp");
  const largeScreen = useBreakpoint("lUp");

  useEffect(() => {
    theme.updateTheme({ background: mediumAndUp ? "default" : "white" });
    return () => theme.updateTheme({ background: "default" });
  }, [mediumAndUp]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) return <Loading />;

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
