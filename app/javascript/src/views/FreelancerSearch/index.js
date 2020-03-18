import React from "react";
import { Box } from "@advisable/donut";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Criteria from "./Criteria";
import ViewSearch from "./ViewSearch";
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
        <Route exact path="/freelancer_search" component={Criteria} />
        <Route path="/freelancer_search/:id" component={ViewSearch} />
      </Switch>
    </Box>
  );
};

export default FreelancerSearch;
