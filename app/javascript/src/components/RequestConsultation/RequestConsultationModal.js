import React, { useState } from "react";
import { useNotifications } from "src/components/Notifications";
import RequestConsultationMessage from "./RequestConsultationMessage";
import RequestConsultationAvailability from "./RequestConsultationAvailability";
import useViewer from "src/hooks/useViewer";
import RequestConsultationUnauthenticated from "./RequestConsultationUnauthenticated";
import SendFreelancerMessage from "./SendFreelancerMessage";

const AVAILABILITY = "AVAILABILITY";
const MESSAGE = "MESSAGE";

export default function RequestConsultationModal({ specialist, dialog }) {
  const viewer = useViewer();
  const { notify } = useNotifications();
  const [step, setStep] = useState(AVAILABILITY);

  const handleUpdateAvailability = () => {
    setStep(MESSAGE);
  };

  const handleSubmitMessage = () => {
    notify(`We have sent your call request to ${specialist.firstName}`);
    dialog.hide();
  };

  if (!viewer) {
    return <RequestConsultationUnauthenticated specialist={specialist} />;
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
