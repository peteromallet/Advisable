// Renders the view for when a freelancer is viewing an application with a
// status of "Working".
import React from "react";
import { Query } from "react-apollo";
import Header from "../../components/Header";
import Loading from "./Loading";
import FetchActiveApplication from "./FetchActiveApplication";
import FETCH_APPLICATION from "./fetchApplication.graphql";

const Component = props => {
  const id = props.match.params.applicationId;

  return (
    <>
      <Header />
      <Query query={FETCH_APPLICATION} variables={{ id }}>
        {query => {
          if (query.loading) return <Loading />;

          return <FetchActiveApplication {...query} {...props} />;
        }}
      </Query>
    </>
  );
};

export default Component;
