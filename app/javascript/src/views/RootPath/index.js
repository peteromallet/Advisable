import React from "react";
import { Redirect } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import useFeatureFlag from "src/hooks/useFeatureFlag";

export default function RootPath() {
  const viewer = useViewer();
  const caseStudiesEnabled = useFeatureFlag("case_studies");
  const isSpecialist = viewer && viewer.__typename === "Specialist";

  if (isSpecialist) {
    return <Redirect to="/applications" />;
  }

  if (caseStudiesEnabled) {
    return <Redirect to="/explore" />;
  }

  return <Redirect to="/projects" />;
}
