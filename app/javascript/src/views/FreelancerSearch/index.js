import React from "react";
import Sent from "./Sent";
import Topic from "./Topic";
import Results from "./Results";
import Criteria from "./Criteria";
import Availability from "./Availability";
import { Box } from "@advisable/donut";
import { Switch, Route, Redirect } from "react-router-dom";
import useViewer from "../../hooks/useViewer";

const FreelancerSearch = () => {
  const viewer = useViewer();

  if (viewer.__typename !== "User") {
    return <Redirect to="/" />;
  }

  return (
    <Box maxWidth={1100} mx="auto" py="xl">
      <Switch>
        <Route path="/freelancer_search/results" component={Results} />
        <Route
          path="/freelancer_search/availability"
          component={Availability}
        />
        <Route path="/freelancer_search/topic" component={Topic} />
        <Route path="/freelancer_search/sent" component={Sent} />
        <Route path="/freelancer_search" component={Criteria} />
      </Switch>
    </Box>
  );
};

export default FreelancerSearch;
