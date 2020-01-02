import React from "react";
import { graphql } from "react-apollo";
import Layout from "../../components/Layout";
import Manage from "./Manage";
import Loading from "./Loading";
import FETCH_DATA from "./fetchData";

const ActiveTalent = ({ data, history }) => {
  const handleClick = application => {
    history.push(`/manage/${application.airtableId}`);
  };

  return (
    <Layout>
      <Layout.Main>
        {data.loading && <Loading />}
        {!data.loading && (
          <Manage
            onClick={handleClick}
            applications={data.viewer.applications}
          />
        )}
      </Layout.Main>
    </Layout>
  );
};

export default graphql(FETCH_DATA)(ActiveTalent);
