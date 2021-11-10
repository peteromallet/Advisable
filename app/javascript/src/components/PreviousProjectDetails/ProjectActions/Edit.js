import React from "react";
import { Box, Tooltip, DialogDisclosure } from "@advisable/donut";
import { Pencil } from "@styled-icons/heroicons-outline/Pencil";
import CircularButton from "src/components/CircularButton";

function EditAction({ project, editModal, size }) {
  return (
    <Tooltip placement="top" content="Edit">
      <Box
        css={`
          outline: none;
        `}
      >
        <DialogDisclosure
          as={CircularButton}
          size={size}
          icon={Pencil}
          aria-label="Edit project"
          {...editModal.atPath(`/previous_projects/${project.id}`)}
        />
      </Box>
    </Tooltip>
  );
}

export default EditAction;
