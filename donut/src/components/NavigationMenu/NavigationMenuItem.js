import React from "react";
import { StyledNavigationMenuItem, StyledNavigationMenuLink } from "./styles";

export default function NavigationMenuItem({ children, to }) {
  return (
    <StyledNavigationMenuItem>
      <StyledNavigationMenuLink to={to}>{children}</StyledNavigationMenuLink>
    </StyledNavigationMenuItem>
  );
}
