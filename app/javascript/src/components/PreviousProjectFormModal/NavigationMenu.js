import React from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { NavigationMenu } from "@advisable/donut";
import { PATH_REGEX } from "./usePreviousProjectModal";

export default function PreviousProjectNavigationMenu() {
  const location = useLocation();
  const pathPrefix = location.pathname.replace(PATH_REGEX, "");
  const match = useRouteMatch(`${pathPrefix}/previous_projects/:id`);
  const id = match?.params?.id;
  const urlPrefix = `${pathPrefix}/previous_projects/${id}`;

  return (
    <NavigationMenu>
      <NavigationMenu.Item to={`${urlPrefix}/client`}>
        Client Details
      </NavigationMenu.Item>
      <NavigationMenu.Item to={`${urlPrefix}/overview`}>
        Project Overview
      </NavigationMenu.Item>
      <NavigationMenu.Item to={`${urlPrefix}/portfolio`}>
        Portfolio
      </NavigationMenu.Item>
      <NavigationMenu.Item to={`${urlPrefix}/validation`}>
        Validation
      </NavigationMenu.Item>
    </NavigationMenu>
  );
}
