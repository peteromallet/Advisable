import React from "react";
import { NavItem } from "./styles";

export default function NavigationLink({ prefix, children, ...props }) {
  return (
    <NavItem {...props}>
      {prefix && React.cloneElement(prefix)}
      <span>{children}</span>
    </NavItem>
  );
}
