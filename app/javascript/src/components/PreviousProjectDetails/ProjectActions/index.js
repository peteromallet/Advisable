import React from "react";
import useViewer from "src/hooks/useViewer";
import { Box } from "@advisable/donut";
import Delete from "./Delete";
import Edit from "./Edit";

function Actions({ project, editModal, size, onDelete, ...props }) {
  const viewer = useViewer();
  const viewerIsOwner = project.specialist.id === viewer?.id;

  if (!viewerIsOwner) return null;

  return (
    <Box display="inline-flex" alignItems="center" {...props}>
      <Box ml={2}>
        <Edit project={project} editModal={editModal} size={size} />
      </Box>
      <Box ml={2}>
        <Delete onDelete={onDelete} project={project} size={size} />
      </Box>
    </Box>
  );
}

export default Actions;
