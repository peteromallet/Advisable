import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";
import Loading from "components/Loading";
import { GET_MATCHES } from "./queries";
import Matches from "./Matches";

export default function Inbox() {
  const { id } = useParams();
  const client = useApolloClient();

  const { loading, data, error } = useQuery(GET_MATCHES, { variables: { id } });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <>Something went wrong</>;
  }

  const handleNext = () => {
    client.writeQuery({
      query: GET_MATCHES,
      variables: { id },
      data: {
        project: {
          ...data.project,
          matches: [...data.project.matches.slice(1)],
        },
      },
    });
  };

  const { matches } = data.project;

  if (matches.length === 0) {
    return <>No Mathces</>;
  }

  return <Matches matches={matches} onNext={handleNext} />;
}
