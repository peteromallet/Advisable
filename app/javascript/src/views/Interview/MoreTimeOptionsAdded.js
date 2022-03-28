import React from "react";
import { Navigate } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
import CallRequested from "./CallRequested";

export default function MoreTimeOptionsAdded({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;

  return isSpecialist ? (
    <Navigate to={`/interview_request/${interview.id}`} />
  ) : (
    <CallRequested interview={interview} />
  );
}
