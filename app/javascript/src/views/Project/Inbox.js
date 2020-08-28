import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "components/Loading";
import { GET_MATCHES } from "./queries";
import Matches from "./Matches";
import SearchingForMatches from "./SearchingForMatches";
import RequestedIntroductions from "./RequestedIntroductions";

export default function Inbox({ project }) {
  const { id } = useParams();

  const { loading, data, error } = useQuery(GET_MATCHES, { variables: { id } });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <>Something went wrong</>;
  }

  const { accepted, sourcing } = data.project;

  if (!sourcing && accepted.length > 0) {
    return <RequestedIntroductions accepted={accepted} />;
  }

  if (data.project.matches.length === 0) {
    return <SearchingForMatches />;
  }

  return <Matches data={data} project={project} />;
}
