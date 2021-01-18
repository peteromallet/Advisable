import React from "react";
import { DialogDisclosure, useDialogState } from "@advisable/donut";
import { StyledButtonsPannel, StyledButton } from "./styles";
import DeleteProjectDialog from "../ProjectActions/DeleteProjectDialog";

export function DraftCTA({ project, modal }) {
  return (
    <StyledButtonsPannel>
      <DialogDisclosure
        as={StyledButton}
        {...modal.atPath(`/previous_projects/${project.id}`)}
      >
        Continue
      </DialogDisclosure>
    </StyledButtonsPannel>
  );
}

export function FailedCTA({ project, modal, onDelete }) {
  const deleteModal = useDialogState();
  return (
    <StyledButtonsPannel>
      <DeleteProjectDialog
        modal={deleteModal}
        onDelete={onDelete}
        project={project}
      />
      <DialogDisclosure
        as={StyledButton}
        {...modal.atPath(`/previous_projects/${project.id}`)}
      >
        Update
      </DialogDisclosure>
      <DialogDisclosure as={StyledButton} {...deleteModal}>
        Delete
      </DialogDisclosure>
    </StyledButtonsPannel>
  );
}
