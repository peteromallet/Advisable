import React from "react";
import { useLocation } from "react-router-dom";
import EditMenu from "./EditMenu";
import SetupMenu from "./SetupMenu";
import { PATH_REGEX } from "./usePreviousProjectModal";

export default function PreviousProjectNavigationMenu({ previousProject }) {
  const location = useLocation();
  const pathPrefix = location.pathname.replace(PATH_REGEX, "");
  const urlPrefix = `${pathPrefix}/previous_projects/${previousProject?.id}`;
  const isPublished = previousProject?.draft === false || false;

  if (isPublished) {
    return <EditMenu previousProject={previousProject} urlPrefix={urlPrefix} />;
  }

  return <SetupMenu previousProject={previousProject} urlPrefix={urlPrefix} />;
}
