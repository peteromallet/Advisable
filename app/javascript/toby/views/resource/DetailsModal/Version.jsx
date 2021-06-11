import React, { useState } from "react";
import { DateTime } from "luxon";
import { Box, Text, Stack } from "@advisable/donut";
import { ChevronUp } from "@styled-icons/heroicons-solid/ChevronUp";
import { ChevronDown } from "@styled-icons/heroicons-solid/ChevronDown";

export default function Version({ version, initialOpen }) {
  const [open, setOpen] = useState(initialOpen || false);

  const handleToggle = () => setOpen(!open);

  return (
    <Box bg="neutral200" borderRadius="8px">
      <Box
        padding={3}
        onClick={handleToggle}
        position="relative"
        css={`
          cursor: pointer;
        `}
      >
        <Text fontSize="xs" fontWeight={500} mb={1}>
          Version {version.number}
        </Text>
        <Text fontSize="2xs" color="neutral700">
          {version.responsible || "Anonymous"} -{" "}
          {DateTime.fromISO(version.createdAt).toFormat("HH:mm dd LLL yyyy")}
        </Text>
        <Box position="absolute" right={3} top="20px" color="neutral500">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Box>
      </Box>
      {open && (
        <Stack padding={3} spacing="md" divider="neutral300">
          {version.changes.map((change) => (
            <Box key={change.attribute}>
              <Text fontSize="2xs" fontWeight={500} mb={1} color="neutral600">
                {change.attribute}
              </Text>
              <Text fontSize="xs" color="neutral900">
                {change.value}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
