import * as React from "react";
import { Box, Text } from "@advisable/donut";
import Back from "src/components/Back";
import View from "src/components/View";
import MultistepMenu from "src/components/MultistepMenu";
import { useMobile } from "src/components/Breakpoint";
import { hasCompleteTasksStep } from "./validationSchema";

let SideBar = (props) => {
  const isMobile = useMobile();
  const { application } = props;

  const urlPrefix = `/applications/${application.id}/proposal`;
  const ratePath = urlPrefix;
  const projectTypePath = `${urlPrefix}/type`;
  const tasksPath = `${urlPrefix}/tasks`;
  const sendPath = `${urlPrefix}/send`;

  const hasRate = Boolean(application.invoiceRate);
  const hasProjectType = Boolean(application.projectType);
  const isSent = application.status === "Proposed";

  return (
    <View.Sidebar>
      <Box paddingBottom="m">
        <Back to="/applications">All Applications</Back>
      </Box>
      <Box paddingBottom="s">
        <Text
          color="neutral900"
          fontSize="18px"
          fontWeight="medium"
          lineHeight="m"
        >
          Proposal for &quot;{application.project.primarySkill?.name}&quot; with{" "}
          {application.project.user.companyName}
        </Text>
      </Box>
      <Box paddingBottom="l">
        <Text fontSize="sm">
          Send {application.project.user.companyName} a proposal to start
          working together.
        </Text>
      </Box>
      {!isMobile && (
        <MultistepMenu>
          <MultistepMenu.Item
            exact
            isComplete={hasRate}
            to={{ pathname: ratePath }}
          >
            Hourly Rate
          </MultistepMenu.Item>
          <MultistepMenu.Item
            exact
            to={{ pathname: projectTypePath }}
            isComplete={hasProjectType}
          >
            Project Type
          </MultistepMenu.Item>
          <MultistepMenu.Item
            to={{ pathname: tasksPath }}
            isDisabled={!hasRate}
            isComplete={hasCompleteTasksStep(application)}
          >
            Project Tasks
          </MultistepMenu.Item>
          <MultistepMenu.Item
            to={{ pathname: sendPath }}
            isDisabled={!hasCompleteTasksStep(application)}
            isComplete={isSent}
          >
            Send Proposal
          </MultistepMenu.Item>
        </MultistepMenu>
      )}
    </View.Sidebar>
  );
};

export default SideBar;
