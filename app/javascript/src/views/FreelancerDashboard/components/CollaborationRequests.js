import React from "react";
import { Box, Text } from "@advisable/donut";
import CollaborationRequest from "./CollaborationRequest";

export default function CollaborationRequests({ collaborationRequests }) {
  const requests = collaborationRequests.map((cr) => (
    <CollaborationRequest key={cr.id} request={cr} />
  ));
  return (
    <Box>
      <Text color="neutral900" fontSize="2xl" fontWeight={450} mb={8}>
        Collaboration requests
      </Text>
      <Box>{requests}</Box>
    </Box>
  );
}
