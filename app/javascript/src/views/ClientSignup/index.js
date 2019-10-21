import React from "react";
import { Box } from "@advisable/donut";
import { Switch, Route, matchPath, useLocation } from "react-router-dom";
import Criteria from "./Criteria";
import PriceRange from "./PriceRange";
import Specialists from "./Specialists";
import Testimonials from "./Testimonials";

const ClientSignup = () => {
  const location = useLocation();
  const isResultsPath = matchPath(location.pathname, {
    path: "/clients/signup/specialists",
  });

  const showTestimonials = !isResultsPath;

  return (
    <Box paddingRight={showTestimonials && { _: null, l: 550 }}>
      <Switch>
        <Route path="/clients/signup/price_range" component={PriceRange} />
        <Route path="/clients/signup/specialists" component={Specialists} />
        <Route path={location.pathname} component={Criteria} />
      </Switch>
      {showTestimonials && (
        <Box display={{ _: "none", l: "block" }}>
          <Testimonials />
        </Box>
      )}
    </Box>
  );
};

export default ClientSignup;
