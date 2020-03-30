import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
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

  return <Booking data={data} match={match} />;
}
