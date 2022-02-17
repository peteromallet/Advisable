import React from "react";
import possesive from "src/utilities/possesive";
import { Box, Text } from "@advisable/donut";

export default function AgreementAcceptedMessage({ message }) {
  const {
    agreement: { user, specialist, company },
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
        {user.name} accepted {possesive(specialist.firstName)} request to work
        together
      </Text>

      <Text color="neutral700">
        {specialist.firstName} can now request payments from {company.name}.
      </Text>
    </Box>
  );
}
