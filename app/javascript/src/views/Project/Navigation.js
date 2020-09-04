import React from "react";
import { Box } from "@advisable/donut";
import { useParams } from "react-router-dom";
import { FileTray, People, Options } from "@styled-icons/ionicons-solid";
import BackButton from "components/BackButton";
import NavigationMenu from "components/NavigationMenu";

function ProjectNavigation({ data }) {
  const { id } = useParams();

  return (
    <Box padding="24px">
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
          Settings
        </NavigationMenu.Item>
      </NavigationMenu>
    </Box>
  );
}

export default ProjectNavigation;
