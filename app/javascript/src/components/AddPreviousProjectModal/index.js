import { graphql } from "react-apollo";
import React, { useState } from "react";
import Modal from "src/components/Modal";
import Loading from "src/components/Loading";
import ClientDetails from "./ClientDetails";
import ProjectDetails from "./ProjectDetails";
import Results from "./Results";
import Reference from "./Reference";
import SKILLS from "./skills.graphql";

const STEPS = [ClientDetails, ProjectDetails, Results, Reference];

const AddPreviousProjectModal = ({ isOpen, onClose, data }) => {
  const [stepIndex, setStepIndex] = useState(0);
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
    console.log("adding valus", newValues);
    setValues({
      ...values,
      ...newValues,
    });
  };

  const Step = STEPS[stepIndex];

  return (
    <Modal size="l" isOpen={isOpen} onClose={onClose} expandOnMobile>
      {data.loading ? (
        <Loading />
      ) : (
        <Step
          values={values}
          skills={data.skills}
          setValues={updateValues}
          gotoNextStep={_ => setStepIndex(stepIndex + 1)}
          gotoPreviousStep={_ => setStepIndex(stepIndex - 1)}
        />
      )}
    </Modal>
  );
};

export default graphql(SKILLS)(AddPreviousProjectModal);
