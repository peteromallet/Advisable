import React from "react";
import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout";
import Loading from "./Loading";
import FETCH_DATA from "./fetchData";
import ActiveApplications from "./ActiveApplications";
import { useHistory } from "react-router";

const FreelancerProjects = () => {
  const history = useHistory();
  const { loading, data } = useQuery(FETCH_DATA);

  const handleClick = (application) => {
    history.push(`/clients/${application.id}`);
  };

  const applications = data?.viewer?.applications || [];

  return (
    <Layout>
      <Layout.Main>
        {loading && <Loading />}
        {!loading && (
          <ActiveApplications
            onClick={handleClick}
            applications={applications}
          />
        )}
      </Layout.Main>
    </Layout>
  );
};

export default FreelancerProjects;
