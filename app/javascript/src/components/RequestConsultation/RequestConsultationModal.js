import React, { useState } from "react";
import { useNotifications } from "src/components/Notifications";
import RequestConsultationMessage from "./RequestConsultationMessage";
import RequestConsultationAvailability from "./RequestConsultationAvailability";

const AVAILABILITY = "AVAILABILITY";
const MESSAGE = "MESSAGE";

export default function RequestConsultationModal({ specialist, dialog }) {
  const { notify } = useNotifications();
  const [step, setStep] = useState(AVAILABILITY);

  const handleUpdateAvailability = () => {
    setStep(MESSAGE);
  };

  const handleSubmitMessage = () => {
    notify(`We have sent your call request to ${specialist.firstName}`);
    dialog.hide();
  };

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
