import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Criteria from "./Criteria";
import SaveSearch from "./SaveSearch";
import Specialists from "./Specialists";
import useViewer from "../../hooks/useViewer";

function ClientSignup() {
  const viewer = useViewer();

  if (viewer) {
    return <Redirect to="/" />;
  }

  return (
    <Switch>
      <Route path="/clients/signup/specialists" component={Specialists} />
      <Route path="/clients/signup/save" component={SaveSearch} />
      <Route path="/clients/signup" component={Criteria} />
    </Switch>
  );
}

export default ClientSignup;
