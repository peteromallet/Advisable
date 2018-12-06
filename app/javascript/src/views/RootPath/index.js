import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import VIEWER from "../../components/AuthenticatedRoute/viewer.graphql";

export default () => {
  return (
    <Query query={VIEWER}>
      {({ data }) => {
        if (data.viewer && !data.viewer.client) {
          return <Redirect to="/setup" />;
        }

        return <Redirect to="/projects" />;
      }}
    </Query>
  );
};
