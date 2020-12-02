import React from "react";
import { AnimatePresence } from "framer-motion";
import { Redirect, Switch, useLocation } from "react-router";
import useViewer from "src/hooks/useViewer";
import useSteps from "src/hooks/useSteps";
import steps from "./Steps";
import OrbitsBackground from "./OrbitsBackground";
import { Box } from "@advisable/donut";
import OrbitsContent from "./OrbitsContent";
import Footer from "./Footer";
import Header from "./Header";

function FreelancerJoin() {
  const { routes, currentStepIndex } = useSteps(steps);
  const location = useLocation();
  const viewer = useViewer();

  // Redirect to root if client or specialist logged in
  if (
    viewer?.isClient ||
    (viewer?.isSpecialist && viewer?.applicationStage !== "Started")
  ) {
    return <Redirect to="/" />;
  }

  return (
    <Box minHeight="100vh" height="100%" width="100%" position="relative">
      <OrbitsBackground step={currentStepIndex} />
      <Box
        pl={{ _: 5, xl: 20 }}
        pr={{ _: 5, xl: 0 }}
        pt={{ _: 6, xl: 12 }}
        pb={{ _: 12 }}
        height="100%"
        minHeight="100vh"
        display="flex"
        position="relative"
        flexDirection="column"
        justifyContent={{ xl: "space-between" }}
      >
        <Header />
        <Box
          display="flex"
          flexDirection={{ xl: "row", _: "column" }}
          // alignItems="flex-start"
          alignItems="center"
          my={{ xl: 6 }}
        >
          <OrbitsContent step={currentStepIndex} />
          <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
              {routes}
            </Switch>
          </AnimatePresence>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default FreelancerJoin;
