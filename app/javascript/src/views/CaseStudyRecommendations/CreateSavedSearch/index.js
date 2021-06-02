import React from "react";
import { Route, Switch, useHistory } from "react-router";
import { AnimatePresence } from "framer-motion";
import { Box, Container, useBreakpoint } from "@advisable/donut";
import Sidebar from "./Sidebar";

export default function CreateSavedSearch() {
  const history = useHistory();
  const largeScreen = useBreakpoint("lUp");
  const forwards = history.action === "PUSH";

  return (
    <div>
      {largeScreen ? <Sidebar /> : null}
      <Box paddingLeft={{ l: "300px" }}>
        <Container paddingY={10} paddingX={[4, 4, 6, 8]} maxWidth="750px">
          <AnimatePresence
            initial={false}
            custom={{ largeScreen, forwards }}
            exitBeforeEnter
          >
            <Switch location={location} key={location.pathname}>
              <Route path={["/explore/new", "/explore/new/:id/skills"]}>
                <Box>Skills</Box>
              </Route>
              <Route path="/explore/new/:id/goals">
                <Box>Goals</Box>
              </Route>
              <Route path="/explore/new/:id/preferences">
                <Box>Preferences</Box>
              </Route>
              <Route path="/explore/new/:id/review">
                <Box>Review</Box>
              </Route>
            </Switch>
          </AnimatePresence>
        </Container>
      </Box>
    </div>
  );
}
