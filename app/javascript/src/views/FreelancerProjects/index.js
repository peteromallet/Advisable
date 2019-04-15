// Loads the active projects view for freelancers.
import React from "react";
import { graphql } from "react-apollo";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Empty from "./Empty";
import Loading from "./Loading";
import ActiveApplications from "./ActiveApplications";
import FETCH_DATA from "./fetchData.graphql";

const FreelancerProjects = ({ data, history }) => {
  const handleClick = application => {
    history.push(`/clients/${application.airtableId}`);
  };

  return (
    <>
      <Header />
      <Layout>
        <Layout.Main>
          {data.loading && <Loading />}
          {!data.loading && data.viewer.applications.length > 0 && (
            <ActiveApplications
              onClick={handleClick}
              applications={data.viewer.applications}
            />
          )}
          {!data.loading && data.viewer.applications.length === 0 && <Empty />}
        </Layout.Main>
      </Layout>
    </>
  );
};

export default graphql(FETCH_DATA)(FreelancerProjects);