import * as React from "react";
import { StyledNavigationMenuItem } from "./styles";

const NavigationMenuItem = ({ children, icon, ...props }) => {
  return (
    <StyledNavigationMenuItem {...props}>
      {icon && icon}
      {children}
    </StyledNavigationMenuItem>
  );
};

export default NavigationMenuItem;
