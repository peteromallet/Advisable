import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@advisable/donut";
import { StyledNewProject, StyledNewProjectIcon } from "./styles";

const NewProject = () => {
  return (
    <StyledNewProject
      as={Link}
      to="/freelancer_search"
      aria-label="Find a new freelancer"
    >
      <StyledNewProjectIcon>
        <Icon icon="search" />
      </StyledNewProjectIcon>
      Find a new freelancer
    </StyledNewProject>
  );
};

export default NewProject;
