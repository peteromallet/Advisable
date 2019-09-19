import React from "react";
import { get } from "lodash";
import { useQuery } from "react-apollo";
import Loading from "./Loading";
import JobListing from "./JobListing";
import NotFound from "../NotFound";
import ApplicationsClosed from "../ApplicationsClosed";
import GET_APPLICATION from "./fetchProject";

let JobListingContainer = ({ history, match }) => {
  const query = useQuery(GET_APPLICATION, {
    variables: {
      id: match.params.applicationId,
    },
  });

  if (query.loading) return <Loading />;
  if (!query.data.application) return <NotFound />;

  const open = get(query.data, "application.project.applicationsOpen");
  if (!open) return <ApplicationsClosed />;

  return <JobListing history={history} application={query.data.application} />;
};

export default JobListingContainer;
