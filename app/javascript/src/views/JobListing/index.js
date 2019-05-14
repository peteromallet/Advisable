import React from "react";
import { get } from "lodash";
import { graphql } from "react-apollo";
import Loading from "./Loading";
import JobListing from "./JobListing";
import NotFound from "../NotFound";
import ApplicationsClosed from "../ApplicationsClosed";
import { getApplicationInvitation } from "../../graphql/queries/applications";

let JobListingContainer = ({ history, data }) => {
  if (data.loading) return <Loading />;
  if (!data.application) return <NotFound />;

  const open = get(data, "application.project.applicationsOpen");
  if (!open) return <ApplicationsClosed />;

  return <JobListing history={history} application={data.application} />;
};

export default graphql(getApplicationInvitation, {
  options: props => ({
    variables: {
      id: props.match.params.applicationId,
    },
  }),
})(JobListingContainer);
