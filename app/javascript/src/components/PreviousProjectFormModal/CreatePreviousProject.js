import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_PREVIOUS_PROJECT, GET_PREVIOUS_PROJECT } from "./queries";
import { PATH_REGEX } from "./usePreviousProjectModal";
import ClientDetails from "./ClientDetails";

export default function CreatePreviousProject() {
  const history = useHistory();
  const location = useLocation();
  const [createPreviousProject] = useMutation(CREATE_PREVIOUS_PROJECT, {
    update(cache, { data }) {
      const previousProject = data.createPreviousProject.previousProject;
      cache.writeQuery({
        query: GET_PREVIOUS_PROJECT,
        variables: { id: previousProject.id },
        data: { previousProject },
      });
    },
  });

  const pathPrefix = location.pathname.replace(PATH_REGEX, "");

  const handleCreate = async (values) => {
    const response = await createPreviousProject({
      variables: { input: values },
    });

    const project = response.data?.createPreviousProject.previousProject;
    history.replace(`${pathPrefix}/previous_projects/${project.id}/client`);
    history.push(`${pathPrefix}/previous_projects/${project.id}/overview`);
  };

  return <ClientDetails onSubmit={handleCreate} />;
}
