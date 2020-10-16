import { memo } from "react";
import MultistepMenu from "../../components/MultistepMenu";
import useLocationStages from "../../hooks/useLocationStages";
import {
  clientDetailsValidationSchema,
  projectOverviewValidationSchema,
} from "./validationSchemas";

const SetupMenu = memo(function SetupMenu({
  previousProject,
  urlPrefix,
}) {
  const { pathWithState, skipped } = useLocationStages();

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
    <MultistepMenu>
      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/client`)}
        isComplete={clientDetailsComplete}
      >
        Client Details
      </MultistepMenu.Item>
      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/overview`)}
        isComplete={projectOverviewComplete}
        isDisabled={!clientDetailsComplete}
      >
        Project Overview
      </MultistepMenu.Item>
      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/portfolio`)}
        isComplete={portfolioComplete}
        isDisabled={!projectOverviewComplete}
      >
        Portfolio
      </MultistepMenu.Item>
      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/more`)}
        isComplete={moreInfoComplete}
        isDisabled={!projectOverviewComplete}
      >
        More Information
      </MultistepMenu.Item>
      <MultistepMenu.Item
        to={pathWithState(`${urlPrefix}/validation`)}
        isDisabled={!projectOverviewComplete}
      >
        Validation
      </MultistepMenu.Item>
    </MultistepMenu>
  );
});

export default SetupMenu;
