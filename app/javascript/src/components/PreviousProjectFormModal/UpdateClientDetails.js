import React from "react";
import usePreviousProject from "./usePreviousProject";
import ClientDetails from "./ClientDetails";

export default function CreatePreviousProject() {
  const { data, loading } = usePreviousProject();

  if (loading) {
    return <div>loading ....</div>;
  }

  const handleSubmit = async (values) => {
    console.log("update");
  };

  return <ClientDetails onSubmit={handleSubmit} />;
}
