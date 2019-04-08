import * as React from "react";
import Text from "../../components/Text";
import Back from "../../components/Back";
import Steps from "../../components/Steps";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import { Padding } from "../../components/Spacing";
import { ApplicationType } from "../../types";

type Props = {
  application: ApplicationType;
};

export default ({ application }: Props) => {
  const urlPrefix = `/applications/${application.airtableId}/proposals`;

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
          Send Dunder Mifflin a proposal to start working together. This is some
          short text to explain what the freelancer should expect when sending a
          proposal
        </Text>
      </Padding>
      <Steps>
        <Steps.Step number={1} to={{ pathname: "test" }}>
          Hourly Rate
        </Steps.Step>
        <Steps.Step number={2} isDisabled to={{ pathname: "testg" }}>
          Project Tasks
        </Steps.Step>
        <Steps.Step number={3} isDisabled to={{ pathname: "test" }}>
          Send Proposal
        </Steps.Step>
      </Steps>
    </Layout.Sidebar>
  );
};
