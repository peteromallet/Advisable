import React from "react";
import ClientDetails from "./ClientDetails";
import { useUpdatePreviousProject } from "./queries";
import useLocationStages from "../../hooks/useLocationStages";

export default function UpdateClientDetails({ modal, data, industries }) {
  const { navigate } = useLocationStages();
  const [updatePreviousProject] = useUpdatePreviousProject();

  const handleSubmit = async (values) => {
    const response = await updatePreviousProject({
      variables: {
        input: {
          previousProject: data.previousProject.id,
          ...values,
        },
      },
    });

    const id = response.data.updatePreviousProject.previousProject.id;
    navigate(`${modal.returnPath}/previous_projects/${id}/overview`);
  };

  return (
    <ClientDetails
      industries={industries}
      onSubmit={handleSubmit}
      initialValues={{
        clientName: data.previousProject.clientName,
        primaryIndustry: data.previousProject.primaryIndustry.name,
        companyType: data.previousProject.companyType,
        industries: data.previousProject.industries.map((i) => i.name),
        confidential: data.previousProject.confidential,
      }}
    />
  );
}
