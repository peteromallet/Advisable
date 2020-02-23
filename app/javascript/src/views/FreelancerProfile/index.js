import React from "react";
import { useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import GET_PROFILE from "./getProfile";
import Desktop from "./Desktop";

function FreelancerProfile() {
  const params = useParams();
  const { loading, data } = useQuery(GET_PROFILE, {
    variables: {
      id: params.id,
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return <Desktop data={data} />;
}

export default FreelancerProfile;
