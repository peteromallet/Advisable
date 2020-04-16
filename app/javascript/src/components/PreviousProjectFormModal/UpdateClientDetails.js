import React from "react";
import ClientDetails from "./ClientDetails";
import { useHistory } from "react-router-dom";
import { useUpdatePreviousProject } from "./queries";

export default function UpdateClientDetails({ modal, data }) {
  const history = useHistory();
  const [updatePreviousProject] = useUpdatePreviousProject();

  const handleSubmit = async (values) => {
    console.log(values);
    const response = await updatePreviousProject({
      variables: {
        input: {
          previousProject: data.previousProject.id,
          ...values,
        },
      },
    });

    const id = response.data.updatePreviousProject.previousProject.id;
    history.push(`${modal.returnPath}/previous_projects/${id}/overview`);
  };

  return (
    <ClientDetails
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
