import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import VIEWER from "../../components/AuthenticatedRoute/viewer.graphql";

export default () => {
  return (
    <Query query={VIEWER}>
      {({ data }) => {
        const { viewer } = data; 
        const isSpecialist = viewer && viewer.__typename === 'Specialist';

        if (isSpecialist) {
          return <Redirect to="/applications" />;
        }

        return <Redirect to="/projects" />;
      }}
    </Query>
  );
};
