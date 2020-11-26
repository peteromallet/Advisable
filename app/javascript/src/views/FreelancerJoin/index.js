import React from "react";
import queryString from "query-string";
import { AnimatePresence } from "framer-motion";
import { Switch, useHistory, useLocation } from "react-router";
import useViewer from "src/hooks/useViewer";
import useSteps from "src/hooks/useSteps";
import steps from "./Steps";
import { Box, SharedOrbitsProvider } from "@advisable/donut";

function FreelancerJoin() {
  const { routes } = useSteps(steps);
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
