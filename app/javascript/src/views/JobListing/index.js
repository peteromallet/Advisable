import React from "react";
import { Query } from "react-apollo";
import Loading from "./Loading";
import JobListing from "./JobListing";
import FETCH_PROJECT from "./fetchProject.graphql";

let JobListingContainer = ({ match, history }) => {
  return (
    <Query query={FETCH_PROJECT} variables={{ id: match.params.applicationId }}>
      {query => {
        if (query.loading) return <Loading />;

        return (
          <JobListing history={history} application={query.data.application} />
        );
      }}
    </Query>
  );
};

export default JobListingContainer;
