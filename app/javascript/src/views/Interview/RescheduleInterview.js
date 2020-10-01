import React from "react";
import { Redirect } from "react-router-dom";
import RescheduleAsClient from "./RescheduleAsClient";
import RescheduleAsSpecialist from "./RescheduleAsSpecialist";
import useViewer from "../../hooks/useViewer";

export default function RescheduleInterview({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;

  if (interview.status !== "Call Scheduled") {
    return <Redirect to={`/interviews/${interview.id}`} />;
  }

  return isSpecialist ? (
    <RescheduleAsSpecialist interview={interview} />
  ) : (
    <RescheduleAsClient interview={interview} />
  );
}
