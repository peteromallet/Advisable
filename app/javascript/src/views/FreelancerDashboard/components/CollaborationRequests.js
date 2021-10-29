import React from "react";
import { Box, Text } from "@advisable/donut";
import CollaborationRequest from "./CollaborationRequest";

export default function CollaborationRequests({ collaborationRequests }) {
  const requests = collaborationRequests.map((cr) => (
    <CollaborationRequest key={cr.id} request={cr} />
  ));
  return (
    <Box>
      <Text>Collaboration requests</Text>
      <Box>{requests}</Box>
    </Box>
  );
}
