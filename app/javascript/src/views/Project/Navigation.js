import React from "react";
import { useParams } from "react-router-dom";
import { FileTray } from "@styled-icons/ionicons-solid/FileTray";
import { People } from "@styled-icons/ionicons-solid/People";
import { Options } from "@styled-icons/ionicons-solid/Options";
import BackButton from "src/components/BackButton";
import NavigationMenu from "src/components/NavigationMenu";

function ProjectNavigation() {
  const { id } = useParams();

  return (
    <>
      <BackButton to="/projects" marginBottom="m" />

      <NavigationMenu>
        <NavigationMenu.Item icon={<FileTray />} to={`/projects/${id}/matches`}>
          Inbox
        </NavigationMenu.Item>
        <NavigationMenu.Item
          icon={<People />}
          to={`/projects/${id}/candidates`}
        >
          Candidates
        </NavigationMenu.Item>
        <NavigationMenu.Item icon={<Options />} to={`/projects/${id}/settings`}>
          Project Details
        </NavigationMenu.Item>
      </NavigationMenu>
    </>
  );
}

export default ProjectNavigation;
