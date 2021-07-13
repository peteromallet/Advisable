import * as React from "react";
import { Box, Text } from "@advisable/donut";
import Back from "src/components/Back";
import Steps from "src/components/Steps";
import View from "src/components/View";
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
        <Steps>
          <Steps.Step
            exact
            number={1}
            to={{ pathname: ratePath }}
            isComplete={hasRate}
          >
            Hourly Rate
          </Steps.Step>
          <Steps.Step
            exact
            number={2}
            to={{ pathname: projectTypePath }}
            isComplete={hasProjectType}
          >
            Project Type
          </Steps.Step>
          <Steps.Step
            number={3}
            to={{ pathname: tasksPath }}
            isDisabled={!hasRate}
            isComplete={hasCompleteTasksStep(application)}
          >
            Project Tasks
          </Steps.Step>
          <Steps.Step
            number={4}
            to={{ pathname: sendPath }}
            isDisabled={!hasCompleteTasksStep(application)}
            isComplete={isSent}
          >
            Send Proposal
          </Steps.Step>
        </Steps>
      )}
    </View.Sidebar>
  );
};

export default SideBar;
