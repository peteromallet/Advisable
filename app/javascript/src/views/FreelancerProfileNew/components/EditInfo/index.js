import React from "react";
import { Pencil } from "@styled-icons/heroicons-solid/Pencil";
import { Button, useModal, DialogDisclosure } from "@advisable/donut";
import EditInfoModal from "./EditInfoModal";

function EditInfoDialog({ children, specialist }) {
  const modal = useModal();

  return (
    <>
      <DialogDisclosure
        as={Button}
        {...modal}
        variant="subtle"
        width={["100%", "auto"]}
        size={["m", "m", "l"]}
        prefix={<Pencil />}
      >
        {children}
      </DialogDisclosure>
      <EditInfoModal modal={modal} specialist={specialist} />
    </>
  );
}

export default EditInfoDialog;
