import React, { useState } from "react";
import Modal from "src/components/Modal";
import ClientDetails from "./ClientDetails";
import ProjectDetails from "./ProjectDetails";
import Results from "./Results";
import Reference from "./Reference";

const STEPS = [ClientDetails, ProjectDetails, Results, Reference];

const AddPreviousProjectModal = ({ isOpen, onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const Step = STEPS[stepIndex];

  const [values, setValues] = useState({
    clientName: "",
    confidential: false,
    industry: "",
    clientDescription: "",
    skills: [],
    requirements: "",
    description: "",
    results: "",
    contactName: "",
    contactEmail: "",
    canContactClient: true,
    contactRole: "",
    contactJobTitle: ""
  });

  const updateValues = newValues => {
    setValues({
      ...newValues,
      ...values
    })
  }

  return (
    <Modal size="l" isOpen={isOpen} onClose={onClose} expandOnMobile>
      <Step
        values={values}
        setValues={updateValues}
        gotoNextStep={_ => setStepIndex(stepIndex + 1)}
        gotoPreviousStep={_ => setStepIndex(stepIndex - 1)}
      />
    </Modal>
  );
};

export default AddPreviousProjectModal;
