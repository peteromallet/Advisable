import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "components/Loading";
import { GET_MATCHES } from "./queries";
import Matches from "./Matches";
import SearchingForMatches from "./SearchingForMatches";
import RequestedIntroductions from "./RequestedIntroductions";
import SourcingDisabled from "./SourcingDisabled";

export default function Inbox({ project }) {
  const { id } = useParams();

  const { loading, data, error } = useQuery(GET_MATCHES, { variables: { id } });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>Something went wrong</>;
  }

  const { accepted, matches, sourcing } = data.project;

  if (matches.length > 0) {
    return <Matches data={data} project={project} />;
  }

  if (!sourcing && accepted.length > 0) {
    return <RequestedIntroductions accepted={accepted} />;
  }

  if (sourcing) {
    return <SearchingForMatches />;
  }

  return <SourcingDisabled />;
}
