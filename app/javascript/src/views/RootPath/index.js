import React from "react";
import { Redirect } from "react-router-dom";
import useViewer from "src/hooks/useViewer";

export default function RootPath() {
  const viewer = useViewer();
  const isSpecialist = viewer && viewer.__typename === "Specialist";

  if (isSpecialist) {
    return <Redirect to="/applications" />;
  }

  return <Redirect to="/explore" />;
}
