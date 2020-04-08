import React from "react";
import usePreviousProject from "./usePreviousProject";

export default function Overview() {
  const { loading, data } = usePreviousProject();

  if (loading) {
    return <div>loading...</div>;
  }

  return <div>overview {data.previousProject.id}</div>;
}
