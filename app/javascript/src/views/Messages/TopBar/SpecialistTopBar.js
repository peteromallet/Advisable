import React from "react";
import { get } from "lodash";
import { withRouter } from "react-router-dom";
import { graphql } from "react-apollo";
import { Text, Padding, Flex } from "@advisable/donut";
import Icon from "../../../components/Icon";
import Avatar from "../../../components/Avatar";
import Status from "../../../components/Status";
import GET_APPLICATION from "../getApplicationForSpecialist";
import { Topbar } from "../styles";

const ClientTopbar = ({ history, data }) => {
  if (data.loading) return null;

  if (data.error) {
    return <>Failed to fetch application</>;
  }

  if (!data.application) {
    return <>Application not found</>;
  }

  let application = data.application;

  let actionText;
  let actionURL;

  if (application.status === "Applied") {
    actionText = "Update Application";
    actionURL = `/invites/${application.airtableId}/apply`;
  }

  if (application.status === "Proposed") {
    actionText = "Update Proposal";
    actionURL = `/applications/${application.airtableId}/proposal`;
  }

  if (application.status === "Application Accepted") {
    if (get(application, "interview.status") === "Call Completed") {
      actionText = "Send Proposal";
      actionURL = `/applications/${application.airtableId}/proposal`;
    }

    if (get(application, "interview.status") === "Call Requested") {
      actionText = "Schedule Interview";
      actionURL = `/interview_request/${application.interview.airtableId}`;
    }
  }

  if (application.status === "Working") {
    actionText = "View Tasks";
    actionURL = `/clients/${application.airtableId}`;
  }

  const handleClick = e => {
    history.push(actionURL);
  };

  return (
    <>
      <Padding bottom="xs">
        <Topbar>
          <Flex align="center">
            <Padding size="s">
              <Avatar
                size="s"
                name={get(application, "project.user.companyName")}
              />
            </Padding>
            <Flex.Item>
              <Padding bottom="xxs">
                <Text weight="semibold">
                  {get(application, "project.user.companyName")}
                </Text>
              </Padding>
              <Status>{application.status}</Status>
            </Flex.Item>
          </Flex>
        </Topbar>
      </Padding>

      <Padding bottom="xxs">
        <Topbar style={{ height: 50 }}>
          <Flex align="center" onClick={handleClick}>
            <Flex.Item fill>
              <Padding left="s">
                <Text weight="medium">{actionText}</Text>
              </Padding>
            </Flex.Item>
            <Padding right="s">
              <Icon icon="chevron-right" />
            </Padding>
          </Flex>
        </Topbar>
      </Padding>
    </>
  );
};

export default withRouter(
  graphql(GET_APPLICATION, {
    options: props => ({
      variables: {
        id: props.applicationId,
      },
    }),
  })(ClientTopbar)
);
