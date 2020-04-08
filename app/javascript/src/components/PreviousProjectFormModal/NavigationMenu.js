import React from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { Box, NavigationMenu, NavigationMenuItem } from "@advisable/donut";
import { PATH_REGEX } from "./usePreviousProjectModal";

export default function PreviousProjectNavigationMenu() {
  const location = useLocation();
  const pathPrefix = location.pathname.replace(PATH_REGEX, "");
  const match = useRouteMatch(`${pathPrefix}/previous_projects/:id`);
  const id = match?.params?.id;
  const urlPrefix = `${pathPrefix}/previous_projects/${id}`;

  return (
    <NavigationMenu>
      <NavigationMenuItem to={`${urlPrefix}/client`}>
        Client Details
      </NavigationMenuItem>
      <NavigationMenuItem to={`${urlPrefix}/overview`}>
        Project Overview
      </NavigationMenuItem>
      <NavigationMenuItem to={`${urlPrefix}/portfolio`}>
        Portfolio
      </NavigationMenuItem>
      <NavigationMenuItem to={`${urlPrefix}/validation`}>
        Validation
      </NavigationMenuItem>
      <NavigationMenuItem to={`${urlPrefix}/more`}>
        More Info
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
