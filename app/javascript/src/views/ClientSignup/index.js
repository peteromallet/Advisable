import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Criteria from "./Criteria";
import PriceRange from "./PriceRange";
import SaveSearch from "./SaveSearch";
import Specialists from "./Specialists";
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

  if (viewer?.__typename === "Specialist") {
    return <Redirect to="/" />;
  }

  return (
    <Switch>
      {STEPS.map(step => (
        <Route key={step.path} path={step.path} component={step.component} />
      ))}
    </Switch>
  );
};

export default ClientSignup;
