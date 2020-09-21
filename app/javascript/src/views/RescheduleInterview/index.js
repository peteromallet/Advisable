import React from "react";
import { useParams } from "react-router";
import { Box, Card } from "@advisable/donut";
import Loading from "components/Loading";
import { useInterview } from "./queries";
import InvalidInterviewState from "./InvalidInterviewState";
import RescheduleAsSpecialist from "./RescheduleAsSpecialist";
import useViewer from "../../hooks/useViewer";
import NotFound, { isNotFound } from "../NotFound";

function RescheduleInterviewState({ interview }) {
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
      if (viewer.isSpecialist) {
        return <RescheduleAsSpecialist interview={interview} />;
      }

      return null;
    }
  }
}

export default function RescheduleInterview() {
  const { id } = useParams();
  const { data, loading, error } = useInterview({ variables: { id } });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const interview = data.interview;

  return (
    <Box maxWidth="500px" paddingY="3xl" marginX="auto">
      <Card borderRadius="12px" padding={["lg", "2xl"]}>
        <RescheduleInterviewState interview={interview} />
      </Card>
    </Box>
  );
}
