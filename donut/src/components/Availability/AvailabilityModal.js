import React from "react";
import Modal, { useModal } from "../Modal";
import AvailabilityForm from "./AvailabilityForm";

const AvailabilityModal = ({ initialAvailability, selectedDay }) => {
  const modal = useModal();

  React.useEffect(() => {
    if (selectedDay !== null) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [selectedDay]);

  return (
    <Modal modal={modal} padding="l" label="Select availability">
      {selectedDay && (
        <AvailabilityForm
          selectedDay={selectedDay}
          initialAvailability={initialAvailability}
        />
      )}
    </Modal>
  );
};

export default AvailabilityModal;
