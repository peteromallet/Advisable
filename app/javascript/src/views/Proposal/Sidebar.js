import * as React from "react";
import { Box, Text } from "@advisable/donut";
import Back from "../../components/Back";
import Steps from "../../components/Steps";
import Layout from "../../components/Layout";
import { useMobile } from "../../components/Breakpoint";
import { hasCompleteTasksStep } from "./validationSchema";

const SideBar = props => {
  const isMobile = useMobile();
  const { application } = props;

  const urlPrefix = `/applications/${application.airtableId}/proposal`;
  const ratePath = urlPrefix;
  const projectTypePath = `${urlPrefix}/type`;
  const tasksPath = `${urlPrefix}/tasks`;
  const sendPath = `${urlPrefix}/send`;

  const hasRate = Boolean(application.rate);
  const hasProjectType = Boolean(application.projectType);
  const isSent = application.status === "Proposed";

  return (
    <Layout.Sidebar>
      <Box pb="m">
        <Back to="/applications">All Applications</Back>
      </Box>
      <Text
        as="h4"
        mb="xs"
        fontSize="l"
        lineHeight="m"
        color="blue.9"
        fontWeight="semibold"
      >
        Proposal for "{application.project.primarySkill}" with{" "}
        {application.project.user.companyName}
      </Text>
      <Text fontSize="s" mb="m" lineHeight="m" color="neutral.8">
        Send {application.project.user.companyName} a proposal to start working
        together.
      </Text>
      {!isMobile && (
        <Steps>
          <Steps.Step exact to={{ pathname: ratePath }} isComplete={hasRate}>
            Hourly Rate
          </Steps.Step>
          <Steps.Step
            exact
            to={{ pathname: projectTypePath }}
            isComplete={hasProjectType}
          >
            Booking Type
          </Steps.Step>
          {application.projectType === "Flexible" ? (
            <Steps.Step
              to={{ pathname: `${urlPrefix}/billing_cycle` }}
              isComplete={Boolean(application.billingCycle)}
            >
              Billing Cycle
            </Steps.Step>
          ) : null}
          {application.projectType === "Fixed" ? (
            <Steps.Step
              to={{ pathname: tasksPath }}
              isDisabled={!hasRate}
              isComplete={hasCompleteTasksStep(application)}
            >
              Projects
            </Steps.Step>
          ) : null}
          <Steps.Step
            to={{ pathname: sendPath }}
            isDisabled={!hasCompleteTasksStep(application)}
            isComplete={isSent}
          >
            Send Proposal
          </Steps.Step>
        </Steps>
      )}
    </Layout.Sidebar>
  );
};

export default SideBar;
