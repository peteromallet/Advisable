import React from "react";
import useViewer from "src/hooks/useViewer";
import RequestConsultationUnauthenticated from "./RequestConsultationUnauthenticated";
import SendFreelancerMessage from "./SendFreelancerMessage";
import RequestConsultation from "./RequestConsultation";

export default function ConnectModal({ specialist, dialog }) {
  const viewer = useViewer();

  if (!viewer) {
    return <RequestConsultationUnauthenticated specialist={specialist} />;
  }

  if (viewer.isSpecialist) {
    return <SendFreelancerMessage specialist={specialist} dialog={dialog} />;
  }

  return <RequestConsultation specialist={specialist} dialog={dialog} />;
}
