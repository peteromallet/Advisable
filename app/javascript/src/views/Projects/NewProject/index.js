import React from "react";
import { Link } from "react-router-dom";
import { StyledNewProject, StyledNewProjectIcon } from "./styles";
import { Icon } from "@advisable/donut";

const NewProject = () => {
  return (
    <StyledNewProject
      as={Link}
      to="/freelancer_search"
      aria-label="Find a new freelancer"
    >
      <StyledNewProjectIcon>
        <Icon icon="plus" />
      </StyledNewProjectIcon>
      Find a new freelancer
    </StyledNewProject>
  );
};

export default NewProject;
