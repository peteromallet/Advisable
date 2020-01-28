import React from "react";
import { useQuery } from "react-apollo";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import Manage from "./Manage";
import Loading from "./Loading";
import FETCH_DATA from "./fetchData";

const ActiveTalent = () => {
  const history = useHistory()
  const { data, loading } = useQuery(FETCH_DATA);

  const handleClick = application => {
    history.push(`/manage/${application.airtableId}`);
  };

  return (
    <Layout>
      <Layout.Main>
        {loading ? <Loading /> : (
          <Manage
            onClick={handleClick}
            applications={data.viewer.applications}
          />
        )}
      </Layout.Main>
    </Layout>
  );
};

export default ActiveTalent;
