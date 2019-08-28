// Renders the freelancers applications view.
import { get } from "lodash";
import * as React from "react";
import { useQuery } from "react-apollo";
import Layout from "../../components/Layout";
import OnHold from "./OnHold";
import FETCH_DATA from "./fetchData.js";
import OpenApplications from "./OpenApplications";
import ApplicationInvitations from "./ApplicationInvitations";

const Applications = ({ history }) => {
  const { loading, data } = useQuery(FETCH_DATA);

  const handleViewInvitation = id => {
    history.push(`/invites/${id}`);
  };

  const invitations = get(data, "viewer.invitations");
  const applications = get(data, "viewer.applications");
  const viewer = get(data, "viewer");

  if (get(viewer, "accountStatus") === "On Hold") {
    return <OnHold invitations={invitations} />;
  }

  return (
    <Layout>
      <Layout.Main>
        <ApplicationInvitations
          loading={loading}
          onViewInvitation={handleViewInvitation}
          applications={loading ? [] : invitations}
        />
        <OpenApplications
          loading={loading}
          specialist={viewer}
          applications={loading ? [] : applications}
          featuredURL={
            loading
              ? null
              : encodeURI(
                  `https://advisable.com/request_feature_invitation?field75221875=${get(
                    viewer,
                    "email"
                  )}&sid=${get(viewer, "airtableId")}`
                )
          }
        />
      </Layout.Main>
    </Layout>
  );
};

export default Applications;
