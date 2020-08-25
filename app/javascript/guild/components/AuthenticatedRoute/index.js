import React from "react";
import { Route } from "react-router-dom";
import useViewer from "@advisable-main/hooks/useViewer";

const AuthenticatedRoute = ({
  render,
  component: Component,
  ...rest
}) => {
  const viewer = useViewer();
  const guildUser = viewer?.isSpecialist && viewer?.guild

  const advisableHost = () => {
    const { host, protocol } = window.location;
    const root = host.replace(/guild\./,'');
    return `${protocol}//${root}`
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!guildUser) return window.location.href = advisableHost();

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AuthenticatedRoute;
