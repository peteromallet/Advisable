// Renders the freelancers applications view.
import * as React from "react";
import { Query } from "react-apollo";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Padding from "../../components/Spacing/Padding";
import ApplicationInvitations from "./ApplicationInvitations";
import OpenApplications from "./OpenApplications";
import FETCH_DATA from "./fetchData.graphql";

const Applications = ({ history }) => {
  const handleViewInvitation = id => {
    history.push(`/invites/${id}`);
  };

  return (
    <Query query={FETCH_DATA}>
      {({ loading, data }) => (
        <React.Fragment>
          <Header />
          <Layout>
            <Layout.Main>
              <Padding bottom="xl">
                <ApplicationInvitations
                  loading={loading}
                  onViewInvitation={handleViewInvitation}
                  applications={loading ? [] : data.viewer.invitations}
                />
              </Padding>
              <OpenApplications
                loading={loading}
                specialist={data.viewer}
                applications={loading ? [] : data.viewer.applications}
                featuredURL={
                  loading
                    ? null
                    : encodeURI(
                        `https://advisable.com/request_feature_invitation?field75221875=${
                          data.viewer.email
                        }&sid=${data.viewer.airtableId}`
                      )
                }
              />
            </Layout.Main>
          </Layout>
        </React.Fragment>
      )}
    </Query>
  );
};

export default Applications;
