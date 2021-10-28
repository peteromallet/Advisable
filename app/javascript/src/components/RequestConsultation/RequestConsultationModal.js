import React, { useState } from "react";
import RequestConsultationMessage from "./RequestConsultationMessage";
import RequestConsultationAvailability from "./RequestConsultationAvailability";
import useViewer from "src/hooks/useViewer";
import RequestConsultationUnauthenticated from "./RequestConsultationUnauthenticated";
import SendFreelancerMessage from "./SendFreelancerMessage";
import ConsultationRequestSent from "./ConsultationRequestSent";

const AVAILABILITY = "AVAILABILITY";
const MESSAGE = "MESSAGE";
const SENT = "SENT";

export default function RequestConsultationModal({ specialist, dialog }) {
  const viewer = useViewer();
  const [step, setStep] = useState(AVAILABILITY);

  const handleUpdateAvailability = () => {
    setStep(MESSAGE);
  };

  const handleSubmitMessage = () => {
    setStep(SENT);
  };

  if (!viewer) {
    return <RequestConsultationUnauthenticated specialist={specialist} />;
  }

  if (step === SENT) {
    return <ConsultationRequestSent specialist={specialist} dialog={dialog} />;
  }

  if (viewer.isSpecialist) {
    return (
      <SendFreelancerMessage
        specialist={specialist}
        onSend={handleSubmitMessage}
      />
    );
  }

  if (step === AVAILABILITY) {
    return (
      <RequestConsultationAvailability
        specialist={specialist}
        onSubmit={handleUpdateAvailability}
      />
    );
  }

  return (
    <RequestConsultationMessage
      specialist={specialist}
      onSubmit={handleSubmitMessage}
    />
  );
}
