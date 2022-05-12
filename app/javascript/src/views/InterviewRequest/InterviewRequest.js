import React from "react";
import { useQuery } from "@apollo/client";
import { Card } from "@advisable/donut";
import { Route, useParams, Routes, Navigate } from "react-router-dom";
import Loading from "src/components/Loading";
import SelectDay from "./SelectDay";
import SelectTime from "./SelectTime";
import { FETCH_INTERVIEW } from "./queries";
import InterviewConfirmed from "./InterviewConfirmed";
import MoreTimesRequested from "./MoreTimesRequested";
import ConfirmInterviewRequest from "./ConfirmInterviewRequest";
import NotFound, { isNotFound } from "src/views/NotFound";
import AccessDenied, { isNotAuthorized } from "../AccessDenied";

export default function InterviewRequestView() {
  const { interviewID } = useParams();
  const { loading, data, error } = useQuery(FETCH_INTERVIEW, {
    variables: { id: interviewID },
  });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  if (isNotAuthorized(error)) return <AccessDenied />;

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
        <Routes>
          <Route
            path=":date"
            element={
              <SelectTime
                timeZone={interview.timeZone}
                clientName={interview.user.companyName}
                availability={interview.user.availability}
              />
            }
          />
          <Route
            path=":date/:time"
            element={<ConfirmInterviewRequest interview={interview} />}
          />

          <Route
            exact
            path="/"
            element={
              <SelectDay
                timeZone={interview.timeZone}
                availability={interview.user.availability}
                clientName={interview.user.companyName}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to={`/interview_request/${interview.id}`} />}
          />
        </Routes>
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
