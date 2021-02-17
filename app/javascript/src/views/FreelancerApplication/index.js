import React from "react";
import { Box, Container, useBreakpoint } from "@advisable/donut";
import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import Introduction from "./Introduction";
import Overview from "./Overview";
import PreviousWork from "./PreviousWork";
import WorkPreferences from "./WorkPreferences";
import IdealProject from "./IdealProject";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function FreelancerApplication() {
  const location = useLocation();
  const history = useHistory();
  const forwards = history.action === "PUSH";
  const largeScreen = useBreakpoint("lUp");

  return (
    <>
      <Sidebar />
      <Box paddingLeft="300px">
        <Container paddingTop={6} maxWidth="750px">
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
