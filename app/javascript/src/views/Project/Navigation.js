import React from "react";
import { Text, Box } from "@advisable/donut";
import { useParams } from "react-router-dom";
import { Slider } from "@styled-icons/boxicons-regular";
import { Inbox, User } from "@styled-icons/boxicons-solid";
import BackButton from "components/BackButton";
import NavigationMenu from "components/NavigationMenu";

function ProjectNavigation({ data }) {
  const { id } = useParams();

  return (
    <Box padding="24px">
      <BackButton to="/projects" marginBottom="m" />

      <NavigationMenu>
        <NavigationMenu.Item icon={<Inbox />} to={`/projects/${id}`} exact>
          Inbox
        </NavigationMenu.Item>
        <NavigationMenu.Item icon={<User />} to={`/projects/${id}/applicants`}>
          Applicants
        </NavigationMenu.Item>
        <NavigationMenu.Item icon={<Slider />} to={`/projects/${id}/settings`}>
          Settings
        </NavigationMenu.Item>
      </NavigationMenu>
    </Box>
  );
}

export default ProjectNavigation;
