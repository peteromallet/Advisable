// Renders the freelancers applications view.
import { get } from "lodash";
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Box, Alert } from "@advisable/donut";
import Layout from "../../components/Layout";
import FETCH_DATA from "./fetchData.js";
import OpenApplications from "./OpenApplications";
import ApplicationInvitations from "./ApplicationInvitations";

const Applications = ({ history }) => {
  const { loading, data } = useQuery(FETCH_DATA);

  const handleViewInvitation = (id) => {
    history.push(`/invites/${id}`);
  };

  const invitations = get(data, "viewer.invitations");
  const applications = get(data, "viewer.applications");
  const viewer = get(data, "viewer");
  const onHold = get(viewer, "applicationStage") === "On Hold";

  return (
    <Layout>
      <Layout.Main>
        {onHold && (
          <Box mb="l">
            <Alert
              mb="m"
              icon="refresh-ccw"
              title="Your account is currently on hold"
            >
              We evaluate and accept freelancers as they apply for projects.
            </Alert>
          </Box>
        )}
        <ApplicationInvitations
          onHold={onHold}
          loading={loading}
          onViewInvitation={handleViewInvitation}
          applications={loading ? [] : invitations}
        />
        <OpenApplications
          onHold={onHold}
          loading={loading}
          specialist={viewer}
          applications={loading ? [] : applications}
          featuredURL={
            loading
              ? null
              : encodeURI(
                  `https://advisable.com/request_feature_invitation?field75221875=${get(
                    viewer,
                    "email",
                  )}&sid=${get(viewer, "airtableId")}`,
                )
          }
        />
      </Layout.Main>
    </Layout>
  );
};

export default Applications;
