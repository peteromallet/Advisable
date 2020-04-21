import React from "react";
import { Search } from "@styled-icons/heroicons-outline";
import { Link } from "react-router-dom";
import { StyledNewProject, StyledNewProjectIcon } from "./styles";

const NewProject = () => {
  return (
    <StyledNewProject
      as={Link}
      to="/freelancer_search"
      aria-label="Find a new freelancer"
    >
      <StyledNewProjectIcon>
        <Search size={32} strokeWidth={2} />
      </StyledNewProjectIcon>
      Find a new freelancer
    </StyledNewProject>
  );
};

export default NewProject;
