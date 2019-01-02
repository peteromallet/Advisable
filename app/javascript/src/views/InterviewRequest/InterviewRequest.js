import { Query } from "react-apollo";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Loading from "src/components/Loading";
import SelectDay from "./SelectDay";
import SelectTime from "./SelectTime";
import InterviewConfirmed from "./InterviewConfirmed";
import MoreTimesRequested from "./MoreTimesRequested";
import ConfirmInterviewRequest from "./ConfirmInterviewRequest";
import FETCH_INTERVIEW from "./fetchInterview.graphql";
import NotFoundError from 'src/views/NotFound/error';
import { Container } from "./styles";

const SELECT_TIME_PATH = ":date([0-9]{4}-[0-9]{2}-[0-9]{2})";
const CONFIRM_PATH =
  ":datetime([0-9]{4}-[0-9]{2}-[0-9]{2}T.*)";

class InterviewRequest extends Component {
  render() {
    const { match } = this.props;

    return (
      <Query
        query={FETCH_INTERVIEW}
        variables={{ id: match.params.interviewID }}
      >
        {query => {
          if (query.loading) return <Loading />;
          const { interview } = query.data;

          if (!interview) {
            throw new NotFoundError()
          }

          return (
            <Container>
              {interview.status === "Call Requested" && (
                <Switch>
                  <Route
                    path={`${match.path}/${SELECT_TIME_PATH}`}
                    render={route => (
                      <SelectTime
                        {...route}
                        timeZone={interview.timeZone}
                        availability={interview.user.availability}
                        clientName={interview.user.companyName}
                      />
                    )}
                  />
                  <Route
                    path={`${match.path}/${CONFIRM_PATH}`}
                    render={route => (
                      <ConfirmInterviewRequest
                        {...route}
                        phoneNumber={
                          interview.application.specialist.phoneNumber
                        }
                        timeZone={interview.timeZone}
                        clientName={interview.user.companyName}
                      />
                    )}
                  />
                  <Route
                    exact
                    path={match.path}
                    render={route => (
                      <SelectDay
                        {...route}
                        timeZone={interview.timeZone}
                        availability={interview.user.availability}
                        clientName={interview.user.companyName}
                      />
                    )}
                  />
                  <Redirect to={match.path} />
                </Switch>
              )}
              {interview.status === "Call Scheduled" && (
                <Route
                  path={match.path}
                  render={route => (
                    <InterviewConfirmed
                      {...route}
                      startsAt={interview.startsAt}
                      timeZone={interview.timeZone}
                      clientName={interview.user.companyName}
                    />
                  )}
                />
              )}
              {interview.status === "Need More Time Options" && (
                <Route
                  path={match.path}
                  render={route => (
                    <MoreTimesRequested
                      {...route}
                      clientName={interview.user.companyName}
                    />
                  )}
                />
              )}
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default InterviewRequest;
