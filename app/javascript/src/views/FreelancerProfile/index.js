import React from "react";
import { useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import { useBreakpoint } from "@advisable/donut";
import NotFound, { isNotFound } from "../NotFound";
import GET_PROFILE from "./getProfile";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import Loading from "./Loading";

function FreelancerProfile() {
  const params = useParams();
  const isDesktop = useBreakpoint("mUp");
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: {
      id: params.id,
    },
  });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  return isDesktop ? <Desktop data={data} /> : <Mobile data={data} />;
}

export default FreelancerProfile;
