import React, { useCallback } from "react";
import css from "@styled-system/css";
import { Box, Text } from "@advisable/donut";
import { DocumentText } from "@styled-icons/heroicons-solid/DocumentText";
import { XCircle } from "@styled-icons/heroicons-solid/XCircle";
import useUpload from "../hooks/useUpload";

export default function Attachment({ attachment, completeUpload, onRemove }) {
  const handleSuccess = useCallback(
    (blob) => {
      completeUpload(attachment.id, blob);
    },
    [attachment.id, completeUpload],
  );

  useUpload(attachment.file, handleSuccess);

  return (
    <Box
      paddingY={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box color="neutral500" marginRight={1}>
          <DocumentText size={20} />
        </Box>
        <Text color="neutral800" fontSize="sm">
          {attachment.file.name}
        </Text>
      </Box>
      <Box>
        <Box
          color="neutral500"
          css={css({
            "&:hover": {
              color: "neutral900",
            },
          })}
        >
          <XCircle size={20} onClick={onRemove} />
        </Box>
      </Box>
    </Box>
  );
}
