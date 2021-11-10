import React, { useState } from "react";
import ConsultationRequestSent from "./ConsultationRequestSent";
import RequestConsultationMessage from "./RequestConsultationMessage";
import RequestConsultationAvailability from "./RequestConsultationAvailability";

const SENT = "SENT";
const MESSAGE = "MESSAGE";
const AVAILABILITY = "AVAILABILITY";

export default function RequestConsultation({ specialist, dialog }) {
  const [step, setStep] = useState(AVAILABILITY);

  const handleUpdateAvailability = () => {
    setStep(MESSAGE);
  };

  const handleSubmitMessage = () => {
    setStep(SENT);
  };

  if (step === SENT) {
    return <ConsultationRequestSent specialist={specialist} dialog={dialog} />;
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
