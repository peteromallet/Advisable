import React from "react";
import { Box, Text, Card, Avatar } from "@advisable/donut";

function ReviewWide({ review }) {
  return (
    <Card p="xl" borderRadius={8}>
      <Box>
        <Box width="100%" display="flex" mb="m">
          <Box width={60} height={60}>
            <Avatar size="m" name={review.name} url={review.avatar} />
          </Box>
          <Box ml="m" mt="xxs">
            <Text
              fontWeight="medium"
              fontSize="l"
              color="neutral900"
              lineHeight="120%"
            >
              {review.name}
            </Text>
            <Text color="neutral600" lineHeight="120%" fontSize="xs">
              {review.role}
            </Text>
            <Text color="neutral600" lineHeight="120%" fontSize="xs">
              {review.companyName}
            </Text>
          </Box>
        </Box>
        <Box width="100%">
          <Text
            fontStyle="italic"
            fontSize="m"
            lineHeight="120%"
            color="neutral800"
          >
            &quot;{review.comment}&quot;
          </Text>
        </Box>
      </Box>
    </Card>
  );
}

export default ReviewWide;
