import React from "react";
import { Container } from "@advisable/donut";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Criteria from "./Criteria";
import ViewSearch from "./ViewSearch";
import ExecuteSearch from "./ExecuteSearch";
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
    <Container py="xl">
      <Switch>
        <Route exact path="/freelancer_search" component={Criteria} />
        <Route
          exact
          path="/freelancer_search/search"
          component={ExecuteSearch}
        />
        <Route path="/freelancer_search/:id" component={ViewSearch} />
      </Switch>
    </Container>
  );
};

export default FreelancerSearch;
