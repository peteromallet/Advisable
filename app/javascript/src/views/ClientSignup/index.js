import React from "react";
import { get, find } from "lodash";
import { Box } from "@advisable/donut";
import {
  Switch,
  Route,
  Redirect,
  matchPath,
  useLocation,
} from "react-router-dom";
import Criteria from "./Criteria";
import PriceRange from "./PriceRange";
import SaveSearch from "./SaveSearch";
import Specialists from "./Specialists";
import Testimonials from "./Testimonials";
import useViewer from "../../hooks/useViewer";

const STEPS = [
  {
    path: "/clients/signup/price_range",
    component: PriceRange,
    showTestimonials: true,
  },
  {
    path: "/clients/signup/specialists",
    component: Specialists,
    showTestimonials: false,
  },
  {
    path: "/clients/signup/save",
    component: SaveSearch,
    showTestimonials: false,
  },
  {
    path: "/clients/signup",
    component: Criteria,
    showTestimonials: true,
  },
];

// Renders the various stages of the client signup flow.
const ClientSignup = () => {
  const viewer = useViewer();
  const location = useLocation();

  if (viewer?.__typename === "Specialist") {
    return <Redirect to="/" />;
  }

  const current = find(STEPS, step => {
    return matchPath(location.pathname, { path: step.path });
  });

  return (
    <Box paddingRight={get(current, "showTestimonials") && { _: null, l: 550 }}>
      <Switch>
        {STEPS.map(step => (
          <Route key={step.path} path={step.path} component={step.component} />
        ))}
      </Switch>
      {get(current, "showTestimonials") && (
        <Box display={{ _: "none", l: "block" }}>
          <Testimonials />
        </Box>
      )}
    </Box>
  );
};

export default ClientSignup;
