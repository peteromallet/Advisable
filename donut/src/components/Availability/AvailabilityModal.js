import React from "react";
import Modal, { useModal } from "../Modal";
import AvailabilityForm from "./AvailabilityForm";

const AvailabilityModal = ({
  initialAvailability,
  selectedDay,
  setAvailabilityForDay,
  setAvailabilityForWeek,
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
    <Modal modal={modal} label="Select availability">
      {selectedDay && (
        <AvailabilityForm
          selectedDay={selectedDay}
          initialAvailability={initialAvailability}
          setAvailabilityForDay={setAvailabilityForDay}
          setAvailabilityForWeek={setAvailabilityForWeek}
        />
      )}
    </Modal>
  );
};

export default AvailabilityModal;
