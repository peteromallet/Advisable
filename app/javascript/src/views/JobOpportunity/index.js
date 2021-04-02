import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import JobOpportunity from "./JobOpportunity";
import NotFound from "../NotFound";
import ApplicationsClosed from "../ApplicationsClosed";
import { GET_PROJECT } from "./queries";

let JobOpportunityContainer = ({ history, match }) => {
  const { loading, data, error } = useQuery(GET_PROJECT, {
    variables: {
      id: match.params.projectId,
    },
  });

  if (loading) return <Loading />;

  if (error) {
    const code = error?.graphQLErrors?.[0]?.extensions?.code;
    if (code === "recordNotFound") {
      return <NotFound />;
    }
  }

  const open = data?.project?.applicationsOpen;
  if (!open) return <ApplicationsClosed />;

  return <JobOpportunity history={history} project={data.project} />;
};

export default JobOpportunityContainer;
