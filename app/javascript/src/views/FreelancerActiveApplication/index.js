// Renders the view for when a freelancer is viewing an application with a
// status of "Working".
import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import NotFound from "../NotFound";
import ActiveApplication from "./ActiveApplication";
import FETCH_APPLICATION from "./fetchApplication";
import { useParams } from "react-router";

const FreelancerActiveApplication = (props) => {
  const params = useParams();
  const id = params.applicationId;
  const query = useQuery(FETCH_APPLICATION, { variables: { id } });

  if (query.loading) return <Loading />;
  if (!query.loading && !query?.data?.application) {
    return <NotFound />;
  }
  return <ActiveApplication {...query} {...props} />;
};

export default FreelancerActiveApplication;
