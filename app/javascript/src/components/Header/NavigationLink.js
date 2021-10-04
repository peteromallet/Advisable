import React from "react";
import { NavItem } from "./styles";

export default function NavigationLink({ children, ...props }) {
  return (
    <NavItem {...props}>
      <span>{children}</span>
    </NavItem>
  );
}