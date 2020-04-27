import React from "react";
import {
  StyledNavigationMenuItem,
  StyledNavigationMenuLink,
  StyledNavigationMenuItemPrefix,
  StyledNavigationMenuItemNumber,
} from "./styles";

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="8"
      fill="none"
      viewBox="0 0 10 8"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.799.243a.87.87 0 01-.016 1.131l-5.893 6.4a.66.66 0 01-.994 0L.217 4.865a.87.87 0 01-.015-1.131.662.662 0 011.01-.017l2.18 1.569L8.789.226a.662.662 0 011.01.017z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default function NavigationMenuItem({
  to,
  number,
  children,
  isComplete,
  isDisabled,
  exact,
}) {
  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
    }
  };

  return (
    <StyledNavigationMenuItem isComplete={isComplete} isDisabled={isDisabled}>
      <StyledNavigationMenuLink to={to} onClick={handleClick} exact={exact}>
        {children}
        <StyledNavigationMenuItemNumber>
          {isComplete ? <Check /> : number}
        </StyledNavigationMenuItemNumber>
      </StyledNavigationMenuLink>
    </StyledNavigationMenuItem>
  );
}
