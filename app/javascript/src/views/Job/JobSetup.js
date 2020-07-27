import React from "react";
import { motion } from "framer-motion";
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
        my={{ _: 0, m: "64px" }}
        mx="auto"
        width="100%"
        padding={{ _: "24px", m: "0" }}
        maxWidth={{ _: "100%", m: "680px" }}
        position="relative"
        as={motion.div}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 40 }}
      >
        {!largeScreen && data.project.status === "Draft" && (
          <SetupDots
            justifyContent={{ _: "start", m: "center" }}
            marginBottom={{ _: "m", m: "l" }}
            current={1}
            number={5}
          />
        )}
        <SetupSteps data={data} />
      </Box>
    </PageWithSidebar>
  );
}
