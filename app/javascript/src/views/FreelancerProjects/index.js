// Loads the active projects view for freelancers.
import React from "react";
import { get } from "lodash";
import { useQuery } from "react-apollo";
import Layout from "../../components/Layout";
import Empty from "./Empty";
import Loading from "./Loading";
import FETCH_DATA from "./fetchData";
import ActiveApplications from "./ActiveApplications";

const FreelancerProjects = ({ history }) => {
  const { loading, data } = useQuery(FETCH_DATA);

  const handleClick = application => {
    history.push(`/clients/${application.airtableId}`);
  };

  const applications = get(data, "viewer.applications") || [];

  return (
    <Layout>
      <Layout.Main>
        {loading && <Loading />}
        {!loading && applications.length > 0 && (
          <ActiveApplications
            onClick={handleClick}
            applications={applications}
          />
        )}
        {!loading && applications.length === 0 && <Empty />}
      </Layout.Main>
    </Layout>
  );
};

export default FreelancerProjects;
