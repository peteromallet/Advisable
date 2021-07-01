import React from "react";
import { Modal, Text, Paragraph } from "@advisable/donut";

export default function CannotEditModal({ modal, action = "Edit" }) {
  return (
    <Modal modal={modal} label={`Cannot ${action}`} padding="l">
      <Text
        as="h4"
        mb={2}
        color="blue900"
        fontSize="24px"
        lineHeight="26px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Cannot {action}
      </Text>
      <Paragraph mb={6}>
        Case studies can't be changed at this time, Please contact{" "}
        <a href="mailto:hello@advisable.com">hello@advisable.com</a> if you want
        to make any changes to this case study.
      </Paragraph>
    </Modal>
  );
}
