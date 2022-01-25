import React from "react";
import possesive from "src/utilities/possesive";
import { Box, Text } from "@advisable/donut";

export default function AgreementDeclinedMessage({ message }) {
  const {
    agreement: { user, specialist },
  } = message;

  return (
    <Box
      padding={4}
      width="100%"
      id={message.id}
      data-status={message.status}
      borderRadius="20px"
      border="2px solid"
      borderColor="neutral100"
      textAlign="center"
    >
      <Text fontWeight={520} marginBottom={1}>
        {user.name} declined {possesive(specialist.firstName)} request to work
        together.
      </Text>
    </Box>
  );
}
