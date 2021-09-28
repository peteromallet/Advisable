import React from "react";
import { Modal, Tabs } from "@advisable/donut";
import SocialProfilesForm from "./SocialProfilesForm";
import AboutMeForm from "./AboutMeForm";

function EditInfoModal({ modal, specialist }) {
  return (
    <Modal modal={modal} p="xxl" label="Edit profile info" width={640}>
      <Tabs label="settings">
        <Tabs.Tab title="About me">
          <AboutMeForm specialist={specialist} modal={modal} />
        </Tabs.Tab>
        <Tabs.Tab title="Social profiles">
          <SocialProfilesForm specialist={specialist} modal={modal} />
        </Tabs.Tab>
      </Tabs>
    </Modal>
  );
}

export default EditInfoModal;
