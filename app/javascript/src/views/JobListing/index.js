import React from "react";
import { Query } from "react-apollo";
import { Header } from "src/components";
import Loading from "./Loading";
import JobListing from "./JobListing";
import FETCH_PROJECT from "./fetchProject.graphql";

let JobListingContainer = ({ match }) => {
  return (
    <React.Fragment>
      <Header />
      <Query query={FETCH_PROJECT} variables={{ id: match.params.applicationId }}>
        {query => {
          if (query.loading) return <Loading />

          return (
            <JobListing
              application={query.data.application}
            />
          )
        }}
      </Query>
    </React.Fragment>
  );
};

export default JobListingContainer;
