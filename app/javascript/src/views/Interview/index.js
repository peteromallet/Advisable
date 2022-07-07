import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import AccessDenied, { isNotAuthorized } from "src/views/AccessDenied";
import NotFound, { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import { useInterview } from "./queries";
import CallScheduled from "./CallScheduled";
import CallRequested from "./CallRequested";
import ClientRequestedReschedule from "./ClientRequestedReschedule";
import SpecialistRequestedReschedule from "./SpecialistRequestedReschedule";
import RescheduleInterview from "./RescheduleInterview";

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

    case "Client Requested Reschedule": {
      return <ClientRequestedReschedule interview={interview} />;
    }

    case "Specialist Requested Reschedule": {
      return <SpecialistRequestedReschedule interview={interview} />;
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
      <Route
        path="reschedule"
        element={<RescheduleInterview interview={interview} />}
      />
      <Route path="*" element={<InterviewState interview={interview} />} />
    </Routes>
  );
}
