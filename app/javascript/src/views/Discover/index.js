import React from "react";
import { Box, useBackground } from "@advisable/donut";
import { Switch } from "react-router";
import Route from "src/components/Route";
import Shortlist from "./views/Shortlist";
import Shortlists from "./views/Shortlists";

export default function Discover() {
  useBackground("white");

  return (
    <Box marginY={12} marginX={8}>
      <Box maxWidth="920px" mx="auto">
        <Switch>
          <Route path="/explore/:id" component={Shortlist} />
          <Route path="/explore" component={Shortlists} />
        </Switch>
      </Box>
    </Box>
  );
}
