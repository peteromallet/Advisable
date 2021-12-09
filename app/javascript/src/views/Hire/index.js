import React from "react";
import { Box, useBackground } from "@advisable/donut";
import Page from "src/components/Page";
import ErrorBoundary from "src/components/ErrorBoundary";
import { Route, Redirect, Switch } from "react-router-dom";
import Proposal from "./views/Proposal";
import Candidates from "./views/Candidates";

export default function Hire() {
  useBackground("beige");

  return (
    <ErrorBoundary>
      <Page width="1020px">
        <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
          <Switch>
            <Route path="/hire/proposals/:id">
              <Proposal />
            </Route>
            <Route path="/hire">
              <Candidates />
            </Route>
            <Route>
              <Redirect to="/hire" />
            </Route>
          </Switch>
        </Box>
      </Page>
    </ErrorBoundary>
  );
}
