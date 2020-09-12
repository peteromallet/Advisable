import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Search } from "@styled-icons/heroicons-outline";
import { useNotifications } from "components/Notifications";
import { CREATE_JOB } from "../queries";
import {
  StyledNewProject,
  StyledNewProjectIcon,
  StyledNewProjectLoading,
} from "./styles";

const NewProject = ({ onCreate }) => {
  const history = useHistory();
  const notifications = useNotifications();
  const [createJob, { loading }] = useMutation(CREATE_JOB, {
    update: onCreate,
  });

  const handleClick = async () => {
    if (loading) return;
    const response = await createJob({ variables: { input: {} } });

    if (response.errors) {
      notifications.notify("Something went wrong");
    } else {
      const id = response.data?.createJob.project.id;
      history.push(`/projects/${id}`);
    }
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
