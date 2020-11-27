import React from "react";
import queryString from "query-string";
import { AnimatePresence } from "framer-motion";
import { Switch, useHistory, useLocation } from "react-router";
import useViewer from "src/hooks/useViewer";
import useSteps from "src/hooks/useSteps";
import steps from "./Steps";
import OrbitsBackground from "./OrbitsBackground";
import { Box } from "@advisable/donut";
import OrbitsContent from "./OrbitsContent";

function FreelancerJoin() {
  const { routes, currentStepIndex } = useSteps(steps);
  const location = useLocation();
  const history = useHistory();
  const viewer = useViewer();
  const project_id = queryString.parse(location.search)?.pid;

  // Redirect to opportunity if specialist logged in
  if (viewer?.isSpecialist && project_id) {
    history.replace(`/opportunities/${project_id}`);
  }
  // Redirect to root if client or specialist logged in
  if (viewer?.isClient || (viewer?.isSpecialist && !project_id)) {
    history.replace("/");
  }

  return (
    <Box height="100vh" width="100%" position="relative">
      <OrbitsBackground step={currentStepIndex} />
      <Box display="flex" height="100%">
        <OrbitsContent step={currentStepIndex} />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.pathname}>
            {routes}
          </Switch>
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default FreelancerJoin;
