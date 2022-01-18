import React from "react";
import { Box, Text } from "@advisable/donut";

export default function ConsultationDeclinedMessage({ message }) {
  const name = message.consultation?.specialist?.firstName;

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
      <Text>
        <Text as="span" fontWeight={520}>
          {name}
        </Text>{" "}
        declined the call request
      </Text>
    </Box>
  );
}
