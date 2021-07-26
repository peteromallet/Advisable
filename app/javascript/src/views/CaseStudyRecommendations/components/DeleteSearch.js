import React from "react";
import { Trash } from "@styled-icons/heroicons-solid/Trash";
import { Modal, Text, Button, useModal } from "@advisable/donut";
import { useDeleteSearch } from "../queries";

export default function DeleteSearch({ search, onDelete = () => {} }) {
  const modal = useModal();
  const [deleteSearch, { loading }] = useDeleteSearch(search);

  const handleDelete = async () => {
    await deleteSearch();
    modal.hide();
    onDelete();
  };

  return (
    <>
      <Button size="xs" variant="subtle" onClick={modal.show}>
        <Trash size={16} />
      </Button>
      <Modal modal={modal}>
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
