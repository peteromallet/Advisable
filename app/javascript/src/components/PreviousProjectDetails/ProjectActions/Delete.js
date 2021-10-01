import React from "react";
import { Trash } from "@styled-icons/heroicons-outline/Trash";
import { Box, Tooltip } from "@advisable/donut";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import CircularButton from "src/components/CircularButton";
import DeleteProjectDialog from "./DeleteProjectDialog";

function DeleteProject({ project, size, onDelete = () => {} }) {
  const modal = useDialogState();

  return (
    <>
      <DeleteProjectDialog
        onDelete={onDelete}
        project={project}
        modal={modal}
      />

      <Tooltip placement="top" content="Delete">
        <Box
          css={`
            outline: none;
          `}
        >
          <DialogDisclosure {...modal}>
            {(props) => (
              <CircularButton
                {...props}
                size={size}
                bg="neutral100"
                color="neutral600"
                aria-label="Delete project"
                data-testid="deleteProject"
                icon={Trash}
              />
            )}
          </DialogDisclosure>
        </Box>
      </Tooltip>
    </>
  );
}

export default DeleteProject;
