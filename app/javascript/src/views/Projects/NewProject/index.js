import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Search } from "@styled-icons/heroicons-outline";
import { CREATE_JOB } from "../queries";
import {
  StyledNewProject,
  StyledNewProjectIcon,
  StyledNewProjectLoading,
} from "./styles";

const NewProject = ({ onCreate }) => {
  const history = useHistory();
  const [createJob, { loading, data }] = useMutation(CREATE_JOB, {
    update: onCreate,
  });

  const handleClick = async () => {
    if (loading) return;
    const response = await createJob({ variables: { input: {} } });
    const id = response.data?.createJob.project.id;
    history.push(`/jobs/${id}`);
  };

  return (
    <StyledNewProject onClick={handleClick} aria-label="Find a new freelancer">
      <StyledNewProjectIcon>
        {loading ? (
          <StyledNewProjectLoading>
            <div />
            <div />
            <div />
          </StyledNewProjectLoading>
        ) : (
          <Search size={32} strokeWidth={2} />
        )}
      </StyledNewProjectIcon>
      Find new talent
    </StyledNewProject>
  );
};

NewProject.defaultProps = {
  onCreate: () => {},
};

export default NewProject;
