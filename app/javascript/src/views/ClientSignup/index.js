import React from "react";
import { Switch, Route } from "react-router-dom";
import Criteria from "./Criteria";
import PriceRange from "./PriceRange";
import Specialists from "./Specialists";

const ClientSignup = () => {
  return (
    <Switch>
      <Route path="/clients/signup/price_range" component={PriceRange} />
      <Route path="/clients/signup/specialists" component={Specialists} />
      <Route path={location.pathname} component={Criteria} />
    </Switch>
  );
};

export default ClientSignup;
