import React from "react";
import Sent from "./Sent";
import Topic from "./Topic";
import Results from "./Results";
import Criteria from "./Criteria";
import Availability from "./Availability";
import { Box } from "@advisable/donut";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
import useScrollRestore from "../../utilities/useScrollRestore";

const FreelancerSearch = () => {
  const viewer = useViewer();
  const location = useLocation();

  useScrollRestore(null, [location.pathname]);

  if (viewer.__typename !== "User") {
    return <Redirect to="/" />;
  }

  return (
    <Box maxWidth={1100} mx="auto" py={{ _: "m", s: "xl" }} px="20px">
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
