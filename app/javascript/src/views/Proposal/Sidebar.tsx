import * as React from "react";
import Text from "../../components/Text";
import Back from "../../components/Back";
import Steps from "../../components/Steps";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import { Padding } from "../../components/Spacing";
import { useMobile } from "../../components/Breakpoint";
import { ApplicationType } from "../../types";
import { hasCompleteTasksStep } from "./validationSchema";

interface Props {
  application: ApplicationType;
}

let SideBar = (props: any) => {
  const isMobile = useMobile();
  const { application } = props;

  const urlPrefix = `/applications/${application.airtableId}/proposal`;
  const ratePath = urlPrefix;
  const tasksPath = `${urlPrefix}/tasks`;
  const sendPath = `${urlPrefix}/send`;

  const hasRate = Boolean(application.rate);
  const isSent = application.status === "Proposed";

  return (
    <Layout.Sidebar>
      <Padding bottom="m">
        <Back to="/applications">All Applications</Back>
      </Padding>
      <Padding bottom="s">
        <Heading level={4}>
          Proposal for "{application.project.primarySkill}" with{" "}
          {application.project.user.companyName}
        </Heading>
      </Padding>
      <Padding bottom="l">
        <Text size="s">
          Send {application.project.user.companyName} a proposal to start
          working together.
        </Text>
      </Padding>
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
            number={2}
            to={{ pathname: tasksPath }}
            isDisabled={!hasRate}
            isComplete={hasCompleteTasksStep(application)}
          >
            Project Tasks
          </Steps.Step>
          <Steps.Step
            number={3}
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
