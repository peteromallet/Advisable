import React from "react";
import { useParams } from "react-router";
import { Box, Card } from "@advisable/donut";
import Loading from "components/Loading";
import { useInterview } from "./queries";
import InvalidInterviewState from "./InvalidInterviewState";
import RescheduleInterview from "./RescheduleInterview";
import RescheduleAsClient from "./RescheduleAsClient";
import RescheduleAsSpecialist from "./RescheduleAsSpecialist";
import useViewer from "../../hooks/useViewer";
import NotFound, { isNotFound } from "../NotFound";

function InterviewState({ interview }) {
  const viewer = useViewer();

  switch (interview.status) {
    case "Call Requested": {
      return (
        <InvalidInterviewState>
          Interview has not been scheduled yet.
        </InvalidInterviewState>
      );
    }

    case "Call Complete": {
      return (
        <InvalidInterviewState>
          This interview has been complete.
        </InvalidInterviewState>
      );
    }

    case "Specialist Requested Reschedule": {
      return <>specialist requested reschedule</>;
    }

    default: {
      return <RescheduleInterview interview={interview} />;
    }
  }
}

export default function Interview() {
  const { id } = useParams();
  const { data, loading, error } = useInterview({ variables: { id } });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const interview = data.interview;

  return (
    <Box maxWidth="500px" paddingY="3xl" marginX="auto">
      <Card borderRadius="12px" padding={["lg", "2xl"]}>
        <InterviewState interview={interview} />
      </Card>
    </Box>
  );
}
