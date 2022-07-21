import React from "react";
import { Card } from "@advisable/donut";
import { Route, useParams, Routes, Navigate } from "react-router-dom";
import Loading from "src/components/Loading";
import SelectDay from "./SelectDay";
import SelectTime from "./SelectTime";
import InterviewConfirmed from "./InterviewConfirmed";
import ConfirmInterviewRequest from "./ConfirmInterviewRequest";
import NotFound, { isNotFound } from "src/views/NotFound";
import AccessDenied, { isNotAuthorized } from "../AccessDenied";
import { useFetchInterview } from "./queries";

export default function InterviewRequestView() {
  const { interviewID } = useParams();
  const { loading, data, error } = useFetchInterview(interviewID);

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  if (isNotAuthorized(error)) return <AccessDenied />;

  const interview = data?.interview;

  if (interview.requestedBy.isViewer) {
    return <Navigate replace to={`/interviews/${interviewID}`} />;
  }

  if (interview.status === "Declined") {
    return <Navigate replace to={`/messages/${interview.conversation.id}`} />;
  }

  return (
    <Card
      mx="auto"
      my="80px"
      width="90%"
      maxWidth={600}
      padding={{ _: "l", md: "xl" }}
      borderRadius="24px"
    >
      {["Call Requested", "Call Reminded"].indexOf(interview.status) > -1 && (
        <Routes>
          <Route
            path=":date"
            element={
              <SelectTime
                timeZone={interview.timeZone}
                name={interview.requestedBy.name}
                availability={interview.requestedBy.availability}
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
                availability={interview.requestedBy.availability}
                account={interview.requestedBy}
                conversationId={interview.conversation.id}
              />
            }
          />
          <Route
            path="*"
            element={
              <Navigate replace to={`/interview_request/${interview.id}`} />
            }
          />
        </Routes>
      )}
      {interview.status === "Call Scheduled" && (
        <InterviewConfirmed
          startsAt={interview.startsAt}
          timeZone={interview.timeZone}
          name={interview.requestedBy.name}
        />
      )}
    </Card>
  );
}
