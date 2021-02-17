import React from "react";
import { AnimatePresence } from "framer-motion";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { Box, Container, useBreakpoint } from "@advisable/donut";
import Sidebar from "./components/Sidebar";
import Welcome from "./steps/Welcome";
import Introduction from "./steps/Introduction";
import Overview from "./steps/Overview";
import PreviousWork from "./steps/PreviousWork";
import WorkPreferences from "./steps/WorkPreferences";
import IdealProject from "./steps/IdealProject";

export default function FreelancerApplication() {
  const location = useLocation();
  const history = useHistory();
  const forwards = history.action === "PUSH";
  const largeScreen = useBreakpoint("lUp");

  return (
    <>
      <Sidebar />
      <Box paddingLeft="300px">
        <Container paddingY={10} maxWidth="750px">
          <AnimatePresence
            initial={false}
            custom={{ largeScreen, forwards }}
            exitBeforeEnter
          >
            <Switch location={location} key={location.pathname}>
              <Route path="/freelancers/apply/introduction">
                <Introduction />
              </Route>
              <Route path="/freelancers/apply/overview">
                <Overview />
              </Route>
              <Route path="/freelancers/apply/experience">
                <PreviousWork />
              </Route>
              <Route path="/freelancers/apply/preferences">
                <WorkPreferences />
              </Route>
              <Route path="/freelancers/apply/ideal_project">
                <IdealProject />
              </Route>
              <Route>
                <Welcome />
              </Route>
            </Switch>
          </AnimatePresence>
        </Container>
      </Box>
    </>
  );
}
