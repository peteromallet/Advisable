import React from "react";
import { Box, Container } from "@advisable/donut";
import Sidebar from "./Sidebar";
import Welcome from "./Welcome";
import Introduction from "./Introduction";
import Overview from "./Overview";
import PreviousWork from "./PreviousWork";
import WorkPreferences from "./WorkPreferences";
import IdealProject from "./IdealProject";
import { Switch, Route } from "react-router-dom";

export default function FreelancerApplication() {
  return (
    <>
      <Sidebar />
      <Box paddingLeft="300px">
        <Container paddingTop={6} maxWidth="750px">
          <Switch>
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
        </Container>
      </Box>
    </>
  );
}
