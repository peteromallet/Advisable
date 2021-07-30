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

  const { percentage } = useUpload(attachment.file, handleSuccess);

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
        <Text
          color={attachment.blob ? "neutral800" : "neutral400"}
          fontSize="sm"
        >
          {attachment.file.name}
        </Text>
      </Box>
      <Box display="flex" alignItems="center">
        {!attachment.blob && (
          <Box width="80px" height="4px" borderRadius="4px" bg="neutral100">
            <Box
              style={{ width: `${percentage}%` }}
              height="100%"
              bg="blue400"
              borderRadius="4px"
            />
          </Box>
        )}
        <Box
          marginLeft={3}
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
