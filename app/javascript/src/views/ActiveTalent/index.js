import React from "react";
import { graphql } from "react-apollo";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Empty from "./Empty";
import Manage from "./Manage";
import Loading from "./Loading";
import FETCH_DATA from "./fetchData.graphql";

const ActiveTalent = ({ data, match, history }) => {
  const handleClick = application => {
    history.push(`/manage/${application.airtableId}`);
  };

  return (
    <>
      <Header />
      <Layout>
        <Layout.Main>
          {data.loading && <Loading />}
          {!data.loading && data.viewer.applications.length > 0 && (
            <Manage
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

export default graphql(FETCH_DATA)(ActiveTalent);
