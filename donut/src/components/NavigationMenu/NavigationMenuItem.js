import React from "react";
import {
  StyledNavigationMenuItem,
  StyledNavigationMenuLink,
  StyledNavigationMenuItemPrefix,
  StyledNavigationMenuItemNumber,
} from "./styles";

export default function NavigationMenuItem({ number, children, to }) {
  return (
    <StyledNavigationMenuItem>
      <StyledNavigationMenuLink to={to}>
        <StyledNavigationMenuItemPrefix>
          <StyledNavigationMenuItemNumber>
            {number}
          </StyledNavigationMenuItemNumber>
        </StyledNavigationMenuItemPrefix>
        {children}
      </StyledNavigationMenuLink>
    </StyledNavigationMenuItem>
  );
}
