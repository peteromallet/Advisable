import React from "react";
import { Trash } from "@styled-icons/heroicons-solid/Trash";
import { Modal, Text, Button, useModal } from "@advisable/donut";
import IconButton from "src/components/IconButton";
import { useDeleteSearch } from "../queries";
import { useNotifications } from "src/components/Notifications";

export default function DeleteSearch({ search, onDelete = () => {} }) {
  const modal = useModal();
  const { error } = useNotifications();
  const [deleteSearch, { loading }] = useDeleteSearch(search);

  const handleDelete = async () => {
    const { errors } = await deleteSearch();
    if (errors) {
      error("Something went wrong, please try again.");
    } else {
      modal.hide();
      onDelete();
    }
  };

  return (
    <>
      <IconButton
        size="sm"
        icon={Trash}
        onClick={modal.show}
        aria-label="Delete search"
      />
      <Modal modal={modal} label="Delete search">
        <Text fontSize="4xl" fontWeight={600} mb={2}>
          Are you sure?
        </Text>
        <Text color="neutral700" marginBottom={6}>
          This search will be deleted and can not be undone.
        </Text>
        <Button
          variant="dark"
          marginRight={2}
          onClick={handleDelete}
          loading={loading}
        >
          Delete
        </Button>
        <Button onClick={modal.hide} variant="subtle">
          Cancel
        </Button>
      </Modal>
    </>
  );
}
