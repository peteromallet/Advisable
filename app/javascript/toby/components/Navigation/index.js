import React from "react";
import { NavLink } from "react-router-dom";
import { useSchema } from "../schema";
import { pluralizeType } from "../../utilities";
import { StyledNavigation, StyledNavLink } from "../../styles";

export default function Navigation() {
  const { resources } = useSchema();

  return (
    <StyledNavigation>
      {resources.map((r) => (
        <StyledNavLink key={r.type} to={`/${pluralizeType(r.type)}`}>
          {r.type}
        </StyledNavLink>
      ))}
    </StyledNavigation>
  );
}
