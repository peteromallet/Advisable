// Renders the view for when a freelancer is viewing an application with a
// status of "Working".
import React from "react";
import { Query } from "react-apollo";
import Loading from "./Loading";
import NotFound from "../NotFound";
import FetchActiveApplication from "./FetchActiveApplication";
import FETCH_APPLICATION from "./fetchApplication.graphql";

const Component = props => {
  const id = props.match.params.applicationId;

  return (
    <Query query={FETCH_APPLICATION} variables={{ id }}>
      {query => {
        if (query.loading) return <Loading />;
        if (!query.loading && !query.data.application) return <NotFound />;
        return <FetchActiveApplication {...query} {...props} />;
      }}
    </Query>
  );
};

export default Component;
