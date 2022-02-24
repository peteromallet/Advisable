import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import { NavItem } from "./styles";

export default function NavigationLink({ prefix, children, to, ...props }) {
  const location = useLocation();
  const match = matchPath(location.pathname, {
    path: to,
    exact: props.exact,
  });
  return (
    <NavItem {...props} href={to} className={match ? "active" : null}>
      {prefix && React.cloneElement(prefix)}
      <span>{children}</span>
    </NavItem>
  );
}
