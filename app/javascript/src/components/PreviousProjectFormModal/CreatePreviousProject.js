import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_PREVIOUS_PROJECT, GET_PREVIOUS_PROJECT } from "./queries";
import { PATH_REGEX } from "./usePreviousProjectModal";
import ClientDetails from "./ClientDetails";

export default function CreatePreviousProject({
  specialistId,
  onCreate,
  industries,
}) {
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
      variables: {
        input: {
          ...values,
          specialist: specialistId,
        },
      },
    });

    const project = response.data?.createPreviousProject.previousProject;
    onCreate(project);
    history.replace(`${pathPrefix}/previous_projects/${project.id}/client`);
    history.push(`${pathPrefix}/previous_projects/${project.id}/overview`);
  };

  return <ClientDetails onSubmit={handleCreate} industries={industries} />;
}
