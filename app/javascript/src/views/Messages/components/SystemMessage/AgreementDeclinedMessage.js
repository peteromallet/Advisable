import React from "react";
import possesive from "src/utilities/possesive";
import { Box, Link, Text } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";

export default function AgreementDeclinedMessage({ message }) {
  const viewer = useViewer();
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
      <Text fontWeight={520}>
        {user.name} declined {possesive(specialist.firstName)} request to work
        together.
      </Text>

      {viewer.id === specialist.id && (
        <Text fontSize="sm" color="neutral600" paddingTop={2}>
          <Link variant="underlined" to={`/new_agreement/${user.id}`}>
            Click here
          </Link>{" "}
          to send another request.
        </Text>
      )}
    </Box>
  );
}
