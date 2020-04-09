import React from "react";
import ClientDetails from "./ClientDetails";
import { useUpdatePreviousProject } from "./queries";
import usePreviousProject from "./usePreviousProject";

export default function CreatePreviousProject() {
  const { data, loading } = usePreviousProject();
  const [updatePreviousProject] = useUpdatePreviousProject();

  if (loading) {
    return <div>loading ....</div>;
  }

  const handleSubmit = async (values) => {
    const response = updatePreviousProject({
      variables: {
        input: {
          previousProject: data.previousProject.id,
          ...values,
        },
      },
    });

    console.log(response);
  };

  return (
    <ClientDetails
      onSubmit={handleSubmit}
      initialValues={{
        clientName: data.previousProject.companyName,
        primaryIndustry: data.previousProject.primaryIndustry.name,
        companyType: data.previousProject.companyType,
        industries: data.previousProject.industries.map((i) => i.name),
        confidential: data.previousProject.confidential,
      }}
    />
  );
}
