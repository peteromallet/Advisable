import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import JobListing from "./JobListing";
import NotFound from "../NotFound";
import ApplicationsClosed from "../ApplicationsClosed";
import { GET_APPLICATION } from "./queries";

let JobListingContainer = ({ history, match }) => {
  const { loading, data, error } = useQuery(GET_APPLICATION, {
    variables: {
      id: match.params.applicationId,
    },
  });

  if (loading) return <Loading />;

  if (error) {
    const code = error?.graphQLErrors?.[0]?.extensions?.code;
    if (code === "recordNotFound") {
      return <NotFound />;
    }
  }

  const open = data?.application?.project?.applicationsOpen;
  if (!open) return <ApplicationsClosed />;

  return <JobListing history={history} application={data.application} />;
};

export default JobListingContainer;
