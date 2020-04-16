import React from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { NavigationMenu } from "@advisable/donut";
import { PATH_REGEX } from "./usePreviousProjectModal";
import {
  clientDetailsValidationSchema,
  projectOverviewValidationSchema,
} from "./validationSchemas";

export default function PreviousProjectNavigationMenu({ previousProject }) {
  const location = useLocation();
  const pathPrefix = location.pathname.replace(PATH_REGEX, "");
  const match = useRouteMatch(`${pathPrefix}/previous_projects/:id`);
  const id = match?.params?.id;
  const urlPrefix = `${pathPrefix}/previous_projects/${id}`;

  const clientDetailsComplete = clientDetailsValidationSchema.isValidSync(
    previousProject,
  );

  const projectOverviewComplete = projectOverviewValidationSchema.isValidSync(
    previousProject,
  );

  const portfolioComplete = (previousProject?.images || []).length > 0;

  return (
    <NavigationMenu>
      <NavigationMenu.Item
        to={`${urlPrefix}/client`}
        isComplete={clientDetailsComplete}
      >
        Client Details
      </NavigationMenu.Item>
      <NavigationMenu.Item
        to={`${urlPrefix}/overview`}
        isComplete={projectOverviewComplete}
        isDisabled={!clientDetailsComplete}
      >
        Project Overview
      </NavigationMenu.Item>
      <NavigationMenu.Item
        to={`${urlPrefix}/portfolio`}
        isComplete={portfolioComplete}
        isDisabled={!projectOverviewComplete}
      >
        Portfolio
      </NavigationMenu.Item>
      <NavigationMenu.Item
        to={`${urlPrefix}/validation`}
        isDisabled={!projectOverviewComplete}
      >
        Validation
      </NavigationMenu.Item>
    </NavigationMenu>
  );
}
