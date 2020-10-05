import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import NotFound, { isNotFound } from "../NotFound";
import useLogoURL from "../../components/ApplicationProvider/useLogoURL";
import Loading from "../../components/Loading";
import { GET_PROFILE } from "./queries";
import Desktop from "./Desktop";

function FreelancerProfileNew() {
  useLogoURL("https://advisable.com");
  const params = useParams();
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: {
      id: params.id,
    },
  });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  return <Desktop data={data} />;
}

export default FreelancerProfileNew;
