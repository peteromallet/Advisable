import { Query } from "react-apollo";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Card from "src/components/Card";
import Heading from "src/components/Heading";
import Loading from "src/components/Loading";
import SelectDay from "./SelectDay";
import SelectTime from "./SelectTime";
import InterviewConfirmed from "./InterviewConfirmed";
import ConfirmInterviewRequest from "./ConfirmInterviewRequest";
import FETCH_INTERVIEW from "./fetchInterview.graphql";
import { Container } from "./styles";

const SELECT_TIME_PATH = ":date([0-9]{4}-[0-9]{2}-[0-9]{2})";
const CONFIRM_PATH = ":datetime([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2})";

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
                        availability={interview.availability}
                        clientName={interview.application.project.client.name}
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
                        clientName={interview.application.project.client.name}
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
                        availability={interview.availability}
                        clientName={interview.application.project.client.name}
                      />
                    )}
                  />
                  <Redirect to={match.path} />
                </Switch>
              )}
              {interview.status !== "Call Requested" && (
                <Route
                  path={match.path}
                  render={route => (
                    <InterviewConfirmed
                      {...route}
                      startsAt={interview.startsAt}
                      timeZone={interview.timeZone}
                      clientName={interview.application.project.client.name}
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
