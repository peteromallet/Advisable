import { get } from "lodash";
import * as React from "react";
import { graphql } from "react-apollo";
import { matchPath } from "react-router";
import Text from "../../components/Text";
import Back from "../../components/Back";
import Steps from "../../components/Steps";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import { Padding } from "../../components/Spacing";
import { ApplicationType } from "../../types";
import FETCH_BOOKING from "./fetchBooking.graphql";

interface Props {
  application: ApplicationType;
}

let SideBar = (props: any) => {
  const { application } = props;

  if (props.data && props.data.loading) {
    return <div>loading ...</div>;
  }

  const booking = props.data.booking || {};
  const tasks = get(booking, "tasks", []);

  const newPath = matchPath(location.pathname, {
    path: "/applications/:applicationId/proposals/new",
  });

  const editPath = matchPath<{ proposalId: string }>(location.pathname, {
    path: "/applications/:applicationId/proposals/:proposalId",
  });

  const proposalId = get(editPath, "params.proposalId");
  const urlPrefix = `/applications/${application.airtableId}/proposals`;
  const ratePath = newPath ? `${urlPrefix}/new` : `${urlPrefix}/${proposalId}`;
  const tasksPath = `${urlPrefix}/${proposalId}/tasks`;
  const sendPath = `${urlPrefix}/${proposalId}/send`;

  const hasRate = Boolean(booking.rate);
  const hasTasks = tasks.length > 0;
  const isSent = booking.status === "Proposed";

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
          isComplete={hasTasks}
        >
          Project Tasks
        </Steps.Step>
        <Steps.Step
          number={3}
          to={{ pathname: sendPath }}
          isDisabled={!hasTasks}
          isComplete={isSent}
        >
          Send Proposal
        </Steps.Step>
      </Steps>
    </Layout.Sidebar>
  );
};

export default graphql<any, any, any, any>(FETCH_BOOKING, {
  skip: () =>
    !matchPath(location.pathname, {
      path: "/applications/:applicationId/proposals/:proposalId",
    }),
  options: () => {
    const match = matchPath<{ proposalId: string }>(location.pathname, {
      path: "/applications/:applicationId/proposals/:proposalId",
    });
    return {
      variables: {
        id: match.params.proposalId,
      },
    };
  },
})(SideBar);
