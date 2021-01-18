import React from "react";
import { DialogDisclosure } from "@advisable/donut";
import { StyledButtonsPannel, StyledButton } from "./styles";

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

export function FailedCTA({ project, modal }) {
  return (
    <StyledButtonsPannel>
      <DialogDisclosure
        as={StyledButton}
        {...modal.atPath(`/previous_projects/${project.id}`)}
      >
        Update
      </DialogDisclosure>
      <DialogDisclosure
        as={StyledButton}
        {...modal.atPath(`/previous_projects/${project.id}`)}
      >
        Delete
      </DialogDisclosure>
    </StyledButtonsPannel>
  );
}
