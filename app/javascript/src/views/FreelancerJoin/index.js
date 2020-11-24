import React from "react";
import OrbitsBackground from "./OrbitsBackground";
import { Box } from "@advisable/donut";
import useSteps from "../../hooks/useSteps";
import steps from "./Steps";
import { AnimatePresence } from "framer-motion";
import { Switch, useLocation } from "react-router";

function FreelancerJoin() {
  const { routes } = useSteps(steps);
  const location = useLocation();

  return (
    <Box height="100vh" width="100%" position="relative">
      <OrbitsBackground />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          {routes}
        </Switch>
      </AnimatePresence>
    </Box>
  );
}

export default FreelancerJoin;
