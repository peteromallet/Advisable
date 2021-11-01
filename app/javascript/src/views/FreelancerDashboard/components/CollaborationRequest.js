import React from "react";
import { Card, Text } from "@advisable/donut";

export default function CollaborationRequest({ request }) {
  return (
    <Card borderRadius="20px" mb={4} p={6}>
      <img src={request.author?.avatar} />
      <Text>{request.author?.name}</Text>
      <Text>{request.createdAtTimeAgo}</Text>
      <Text>{request.title}</Text>
      <Text>{request.excerpt}</Text>
    </Card>
  );
}
