import React from "react";
import { useQuery } from "@apollo/client";
import { Card } from "@advisable/donut";
import {
  Route,
  useParams,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import Loading from "src/components/Loading";
import SelectDay from "./SelectDay";
import SelectTime from "./SelectTime";
import { FETCH_INTERVIEW } from "./queries";
import InterviewConfirmed from "./InterviewConfirmed";
import MoreTimesRequested from "./MoreTimesRequested";
import ConfirmInterviewRequest from "./ConfirmInterviewRequest";
import NotFound, { isNotFound } from "src/views/NotFound";

const SELECT_TIME_PATH = ":date([0-9]{4}-[0-9]{2}-[0-9]{2})";
const CONFIRM_PATH = ":datetime([0-9]{4}-[0-9]{2}-[0-9]{2}T.*)";

export default function InterviewRequestView() {
  const match = useRouteMatch();
  const { interviewID } = useParams();
  const { loading, data, error } = useQuery(FETCH_INTERVIEW, {
    variables: { id: interviewID },
  });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const interview = data?.interview;
  return (
    <Card
      mx="auto"
      my="80px"
      width="90%"
      maxWidth={600}
      padding={{ _: "l", md: "xl" }}
      borderRadius="24px"
    >
      {[
        "Call Requested",
        "More Time Options Added",
        "Client Requested Reschedule",
      ].indexOf(interview.status) > -1 && (
        <Switch>
          <Route path={`${match.path}/${SELECT_TIME_PATH}`}>
            <SelectTime
              timeZone={interview.timeZone}
              clientName={interview.user.companyName}
              availability={interview.user.availability}
            />
          </Route>
          <Route path={`${match.path}/${CONFIRM_PATH}`}>
            <ConfirmInterviewRequest interview={interview} />
          </Route>

          <Route exact path={match.path}>
            <SelectDay
              timeZone={interview.timeZone}
              availability={interview.user.availability}
              clientName={interview.user.companyName}
            />
          </Route>
          <Route path="*">
            <Redirect to={match.path} />
          </Route>
        </Switch>
      )}
      {interview.status === "Call Scheduled" && (
        <InterviewConfirmed
          startsAt={interview.startsAt}
          timeZone={interview.timeZone}
          clientName={interview.user.companyName}
        />
      )}
      {interview.status === "Need More Time Options" && (
        <MoreTimesRequested clientName={interview.user.companyName} />
      )}
    </Card>
  );
}
