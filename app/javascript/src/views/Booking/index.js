import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import AccessDenied from "../../components/AccessDenied";
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

  if (error?.graphQLErrors[0]?.code === "invalidPermissions") {
    return <AccessDenied />;
  }
  return <Booking data={data} match={match} />;
}
