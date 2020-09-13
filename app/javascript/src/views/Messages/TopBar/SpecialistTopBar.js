import React from "react";
import { get } from "lodash-es";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ChevronRight } from "@styled-icons/feather";
import { Text, Box, Avatar } from "@advisable/donut";
import Status from "../../../components/Status";
import GET_APPLICATION from "../getApplicationForSpecialist";
import { Topbar } from "../styles";

const SpecialistTopBar = (props) => {
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_APPLICATION, {
    variables: {
      id: props.applicationId,
    },
  });

  if (loading) return null;

  if (error) {
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

  const handleClick = () => {
    history.push(actionURL);
  };

  return (
    <>
      <Box paddingBottom="xs">
        <Topbar>
          <Box display="flex" alignItems="center">
            <Box padding="s">
              <Avatar
                size="s"
                name={get(application, "project.user.companyName")}
              />
            </Box>
            <Box>
              <Box paddingBottom="xxs">
                <Text weight="semibold">
                  {get(application, "project.user.companyName")}
                </Text>
              </Box>
              <Status>{application.status}</Status>
            </Box>
          </Box>
        </Topbar>
      </Box>

      <Box paddingBottom="xxs">
        <Topbar style={{ height: 50 }}>
          <Box display="flex" alignItems="center" onClick={handleClick}>
            <Box flex="1">
              <Box paddingLeft="s">
                <Text weight="medium">{actionText}</Text>
              </Box>
            </Box>
            <Box paddingRight="s">
              <ChevronRight size={24} strokeWidth={2} />
            </Box>
          </Box>
        </Topbar>
      </Box>
    </>
  );
};

export default SpecialistTopBar;
