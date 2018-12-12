import React from "react";
import Text from "../../../components/Text";
import Modal from "../../../components/Modal";
import Heading from "../../../components/Heading";
import { NewProjectChoice } from "./styles";

export default ({ isOpen, onClose }) => {
  const openCalendly = () => {
    Calendly.showPopupWidget(
      "https://calendly.com/advisable-marketing/briefing/"
    );
    return false;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="xl">
      <Heading centered>Create a new project</Heading>

      <Text marginBottom="l">How would you like to setup your project?</Text>
      <NewProjectChoice to="#" onClick={openCalendly}>
        <h4>Request a call back</h4>
        <p>
          Have an Advisable team member setup a project with you making sure you
          don’t miss anything!
        </p>
        <svg className="Arrow" width={7} height={11} fill="none">
          <path d="M.778 10.5l5-5-5-5" stroke="#8F96AE" />
        </svg>
      </NewProjectChoice>
      <NewProjectChoice to="/project_setup">
        <h4>Self-serve</h4>
        <p>
          Setup the project yourself without speaking to a member of the
          Advisable team.
        </p>
        <svg className="Arrow" width={7} height={11} fill="none">
          <path d="M.778 10.5l5-5-5-5" stroke="#8F96AE" />
        </svg>
      </NewProjectChoice>
    </Modal>
  );
};
