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
      {query => (
        <React.Fragment>
          <Header />
          <Layout>
            <Layout.Main>
              <Padding bottom="xl">
                <ApplicationInvitations
                  loading={query.loading}
                  onViewInvitation={handleViewInvitation}
                  applications={
                    query.loading ? [] : query.data.viewer.invitations
                  }
                />
              </Padding>
              <OpenApplications
                loading={query.loading}
                applications={
                  query.loading ? [] : query.data.viewer.applications
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
