import React from "react";
import { Navigate } from "react-router-dom";
import RescheduleAsClient from "./RescheduleAsClient";
import RescheduleAsSpecialist from "./RescheduleAsSpecialist";
import useViewer from "../../hooks/useViewer";

const ALLOWED_STATUSES = ["Call Scheduled", "Call Completed"];

export default function RescheduleInterview({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;

  if (!ALLOWED_STATUSES.includes(interview.status)) {
    return <Navigate to={`/interviews/${interview.id}`} />;
  }

  return isSpecialist ? (
    <RescheduleAsSpecialist interview={interview} />
  ) : (
    <RescheduleAsClient interview={interview} />
  );
}
