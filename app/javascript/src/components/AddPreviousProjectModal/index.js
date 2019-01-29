import React, { useState } from "react";
import Modal from "src/components/Modal";
import ClientDetails from "./ClientDetails";
import ProjectDetails from "./ProjectDetails";
import Results from "./Results";
import Reference from "./Reference";

const STEPS = [ClientDetails, ProjectDetails, Results, Reference];

const AddPreviousProjectModal = ({ isOpen, onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState({});
  const Step = STEPS[stepIndex];

  return (
    <Modal size="l" isOpen={isOpen} onClose={onClose} expandOnMobile>
      <Step
        values={values}
        setValues={setValues}
        gotoNextStep={_ => setStepIndex(stepIndex + 1)}
        gotoPreviousStep={_ => setStepIndex(stepIndex - 1)}
      />
    </Modal>
  );
};

export default AddPreviousProjectModal;
