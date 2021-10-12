import React from "react";
import { Box, useBackground } from "@advisable/donut";
import Page from "src/components/Page";
import ErrorBoundary from "src/components/ErrorBoundary";
import { Redirect, Switch } from "react-router";
import Route from "src/components/Route";
import Proposal from "./views/Proposal";
import Candidates from "./views/Candidates";

export default function Hire() {
  useBackground("beige");

  return (
    <ErrorBoundary>
      <Page width="1020px">
        <Box paddingY={{ _: 8, m: 12 }} paddingX={{ _: 4, m: 8 }}>
          <Switch>
            <Route path="/hire/proposals/:id" component={Proposal} />
            <Route path="/hire" component={Candidates} />
            <Redirect to="/hire" />
          </Switch>
        </Box>
      </Page>
    </ErrorBoundary>
  );
}
