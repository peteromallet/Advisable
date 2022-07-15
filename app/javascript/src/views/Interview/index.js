import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import AccessDenied, { isNotAuthorized } from "src/views/AccessDenied";
import NotFound, { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import { useInterview } from "./queries";
import CallScheduled from "./CallScheduled";
import CallRequested from "./CallRequested";

function InterviewState({ interview }) {
  switch (interview.status) {
    case "Call Requested": {
      return <CallRequested interview={interview} />;
    }

    case "Call Scheduled": {
      return <CallScheduled interview={interview} />;
    }

    case "Call Completed": {
      return <CallScheduled interview={interview} />;
    }

    default: {
      return null;
    }
  }
}

export default function Interview() {
  const { id } = useParams();
  const { data, loading, error } = useInterview({ variables: { id } });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  if (isNotAuthorized(error)) return <AccessDenied />;

  const interview = data.interview;

  return (
    <Routes>
      <Route path="*" element={<InterviewState interview={interview} />} />
    </Routes>
  );
}
