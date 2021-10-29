import React from "react";
import { Card, Box } from "@advisable/donut";

export default function CollaborationRequest({ request }) {
  return (
    <Card borderRadius="20px">
      <Box>{request.title}</Box>
    </Card>
  );
}
