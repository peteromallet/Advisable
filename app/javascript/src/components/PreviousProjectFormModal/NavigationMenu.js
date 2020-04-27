import React from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import { NavigationMenu } from "@advisable/donut";
import { PATH_REGEX } from "./usePreviousProjectModal";
import useLocationStages from "../../hooks/useLocationStages";
import {
  clientDetailsValidationSchema,
  projectOverviewValidationSchema,
} from "./validationSchemas";

export default function PreviousProjectNavigationMenu({ previousProject }) {
  const location = useLocation();
  const { pathWithState, skipped } = useLocationStages();
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

  const portfolioComplete =
    (previousProject?.images || []).length > 0 || skipped("PORTFOLIO");

  const moreInfoComplete =
    previousProject?.costToHire ||
    previousProject?.executionCost ||
    previousProject?.industryRelevance ||
    previousProject?.locationRelevance ||
    skipped("MORE");

  return (
    <NavigationMenu>
      <NavigationMenu.Item
        to={pathWithState(`${urlPrefix}/client`)}
        isComplete={clientDetailsComplete}
      >
        Client Details
      </NavigationMenu.Item>
      <NavigationMenu.Item
        to={pathWithState(`${urlPrefix}/overview`)}
        isComplete={projectOverviewComplete}
        isDisabled={!clientDetailsComplete}
      >
        Project Overview
      </NavigationMenu.Item>
      <NavigationMenu.Item
        to={pathWithState(`${urlPrefix}/portfolio`)}
        isComplete={portfolioComplete}
        isDisabled={!projectOverviewComplete}
      >
        Portfolio
      </NavigationMenu.Item>
      <NavigationMenu.Item
        to={pathWithState(`${urlPrefix}/more`)}
        isComplete={moreInfoComplete}
        isDisabled={!projectOverviewComplete}
      >
        More Information
      </NavigationMenu.Item>
      <NavigationMenu.Item
        to={pathWithState(`${urlPrefix}/validation`)}
        isDisabled={!projectOverviewComplete}
      >
        Validation
      </NavigationMenu.Item>
    </NavigationMenu>
  );
}
