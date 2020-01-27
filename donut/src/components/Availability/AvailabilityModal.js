import React from "react";
import Modal, { useModal } from "../Modal";
import AvailabilityForm from "./AvailabilityForm";

const AvailabilityModal = ({
  timeZone,
  selectedDay,
  initialAvailability,
  setAvailabilityForDay,
}) => {
  const modal = useModal();

  React.useEffect(() => {
    if (selectedDay !== null) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [selectedDay]);

  return (
    <Modal modal={modal} label="Select availability" showCloseButton={false}>
      {selectedDay && (
        <AvailabilityForm
          timeZone={timeZone}
          selectedDay={selectedDay}
          initialAvailability={initialAvailability}
          setAvailabilityForDay={setAvailabilityForDay}
        />
      )}
    </Modal>
  );
};

export default AvailabilityModal;
