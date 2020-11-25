import React from "react";
import { AnimatePresence } from "framer-motion";
import { Switch, useLocation } from "react-router";
import useSteps from "src/hooks/useSteps";
import steps from "./Steps";
import { Box, SharedOrbitsProvider } from "@advisable/donut";

function FreelancerJoin() {
  const { routes } = useSteps(steps);
  const location = useLocation();

  return (
    <Box height="100vh" width="100%" position="relative">
      <SharedOrbitsProvider>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            {routes}
          </Switch>
        </AnimatePresence>
      </SharedOrbitsProvider>
    </Box>
  );
}

export default FreelancerJoin;
