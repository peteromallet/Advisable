// Allows a user to add more availability to their calendar within the context
// of a single interview
import React from "react";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import { Query } from "react-apollo";
import NotFoundError from "src/views/NotFound/error";
import AvailabilityForInterview from './AvailabilityForInterview';
import FETCH_DATA from "./fetchData.graphql";

const InterviewAvailability = ({ match, history }) => {
  return (
    <React.Fragment>
      <Header />
      <Query query={FETCH_DATA} variables={{ id: match.params.interviewID }}>
        {query => {
          if (query.loading) return <Loading />;
          if (!query.data.interview) {
            throw new NotFoundError()
          }

          return (
            <AvailabilityForInterview
              match={match}
              interview={query.data.interview}
            />
          )
        }}
      </Query>
    </React.Fragment>
  );
};

export default InterviewAvailability;
