import React from "react";
import { Box, Tooltip } from "@advisable/donut";
import { Pencil } from "@styled-icons/heroicons-outline";
import CircularButton from "src/components/CircularButton";

function Edit({ project, size }) {
  const handleClick = () => {
    console.log("edit project", project);
  };

  return (
    <Tooltip placement="top" content="Edit">
      <Box
        css={`
          outline: none;
        `}
      >
        <CircularButton
          size={size}
          bg="neutral100"
          color="neutral600"
          icon={<Pencil />}
          onClick={handleClick}
        />
      </Box>
    </Tooltip>
  );
}

export default Edit;
