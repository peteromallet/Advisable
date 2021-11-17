import React from "react";
import { Text, Link, Button, Modal } from "@advisable/donut";

export default function EditCaseStudyModal({ modal, caseStudy }) {
  return (
    <Modal modal={modal}>
      <Text>ololo</Text>
      <Link.External href={caseStudy.editorUrl} target="_blank">
        <Button>Go to the editor</Button>
      </Link.External>
    </Modal>
  );
}
