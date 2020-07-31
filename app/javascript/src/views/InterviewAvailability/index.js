// Allows a user to add more availability to their calendar within the context
// of a single interview
import React from "react";
import Loading from "src/components/Loading";
import { useQuery } from "@apollo/client";
import NotFound from "src/views/NotFound";
import AvailabilityForInterview from "./AvailabilityForInterview";
import { GET_DATA } from "./queries";

const InterviewAvailability = ({ match }) => {
  const query = useQuery(GET_DATA, {
    variables: { id: match.params.interviewID },
  });
  if (query.loading) return <Loading />;
  if (!query.data.interview) {
    return <NotFound />;
  }

  return <AvailabilityForInterview data={query.data} />;
};

export default InterviewAvailability;
