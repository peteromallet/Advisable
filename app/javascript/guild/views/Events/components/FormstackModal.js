import React from "react";
import { Modal, useBreakpoint } from "@advisable/donut";

export default function FormstackModal({ modal, label, src }) {
  const sUp = useBreakpoint("sUp");
  return (
    <Modal
      padding={[2, 12]}
      modal={modal}
      label={label}
      width={sUp ? 780 : "100%"}
    >
      <iframe
        src={src}
        title={label}
        width="100%"
        height={sUp ? "400" : "1200"}
      />
    </Modal>
  );
}
