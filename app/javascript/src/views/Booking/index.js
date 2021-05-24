import * as React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import AccessDenied from "src/views/AccessDenied";
import NotFound from "src/views/NotFound";
import Loading from "src/components/Loading";
import GET_ACTIVE_APPLICATION from "./getActiveApplication";
import Booking from "./Booking";

export default function BookingContainer({ match }) {
  const { applicationId } = useParams();
  const { data, loading, error } = useQuery(GET_ACTIVE_APPLICATION, {
    variables: {
      id: applicationId,
    },
  });

  if (loading) return <Loading />;
  if (!data.application) return <NotFound />;

  if (error?.graphQLErrors[0]?.code === "INVALID_PERMISSIONS") {
    return <AccessDenied />;
  }

  return <Booking data={data} match={match} />;
}
