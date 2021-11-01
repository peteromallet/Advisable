import React from "react";
import { Box, Button, Text } from "@advisable/donut";
import CollaborationRequest from "./CollaborationRequest";
import { Pencil } from "@styled-icons/heroicons-outline/Pencil";

export default function CollaborationRequests({ collaborationRequests }) {
  const requests = collaborationRequests.map((cr) => (
    <CollaborationRequest key={cr.id} request={cr} />
  ));
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={8}>
        <Text color="neutral900" fontSize="2xl" fontWeight={450}>
          Collaboration requests
        </Text>
        <Button prefix={<Pencil />} ml="auto" size="s" variant="subtle">
          Post
        </Button>
      </Box>
      <Box>{requests}</Box>
    </Box>
  );
}
