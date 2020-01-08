import React from "react";
import Results from "./Results";
import Criteria from "./Criteria";
import { Box } from "@advisable/donut";
import { Switch, Route } from "react-router-dom";

const FreelancerSearch = () => {
  return (
    <Box maxWidth={1100} mx="auto" py="xl">
      <Switch>
        <Route path="/freelancer_search/results" component={Results} />
        <Route path="/freelancer_search" component={Criteria} />
      </Switch>
    </Box>
  );
};

export default FreelancerSearch;
