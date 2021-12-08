import React from "react";
import { Redirect } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
import CallRequested from "./CallRequested";

export default function MoreTimeOptionsAdded({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;

  return isSpecialist ? (
    <Redirect to={`/interview_request/${interview.id}`} />
  ) : (
    <CallRequested interview={interview} />
  );
}
