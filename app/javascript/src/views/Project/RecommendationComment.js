import React from "react";
import { DateTime } from "luxon";
import { Avatar, Card, Box, Text } from "@advisable/donut";

function formatTime(timestamp) {
  return DateTime.fromISO(timestamp).toLocal().toFormat("dd MMM, hh:mm a");
}

function RecommendationComment({ data }) {
  const salesPerson = data.project.user.salesPerson;
  const match = data.project.matches[0];
  const specialist = match.specialist;
  const comment = match.comment;
  const applied = match.appliedAt;

  return (
    <Card padding="24px" marginBottom="52px">
      <Box marginBottom="16px" display="flex" alignItems="center">
        <Avatar size="s" name={salesPerson.name} url={salesPerson.image} />
        <Box paddingLeft="12px">
          <Text marginBottom="2px">
            {specialist.firstName} was recommended by {salesPerson.firstName}
          </Text>
          <Text fontSize="14px" color="neutral500">
            {applied && formatTime(applied)}
          </Text>
        </Box>
      </Box>
      <Box padding="16px" borderRadius="12px" bg="#F4F4F9">
        <Text fontSize="15px" lineHeight="20px">
          {comment}
        </Text>
      </Box>
    </Card>
  );
}

export default RecommendationComment;
