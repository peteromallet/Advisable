import React from "react";
import { useModal, Modal, DialogDisclosure } from "@advisable/donut";
import { useDeleteInterest } from "../queries";
import CircularButton from "src/components/CircularButton";
import { Trash } from "@styled-icons/heroicons-outline";
import Button from "src/components/Button";
import { useNavigate } from "react-router-dom";

export default function RemoveInterest({ interest }) {
  const modal = useModal();
  const navigate = useNavigate();
  const [deleteInterest, { loading }] = useDeleteInterest(interest);

  const handleRemove = async () => {
    await deleteInterest();
    navigate("/explore", {
      state: { fetchPolicy: "network-only" },
    });
  };

  return (
    <>
      <Modal modal={modal}>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-1 tracking-tight">
            Are you sure?
          </h3>
          <p className="mb-6">
            Are you sure you want to remove "{interest.term}" from your
            interests?
          </p>
          <div className="inline-flex gap-3">
            <Button onClick={handleRemove}>Remove</Button>
            <Button variant="outlined" onClick={modal.hide}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <DialogDisclosure {...modal}>
        {(disclosure) => (
          <CircularButton
            aria-label="Remove interest"
            icon={Trash}
            disabled={loading}
            {...disclosure}
          />
        )}
      </DialogDisclosure>
    </>
  );
}
