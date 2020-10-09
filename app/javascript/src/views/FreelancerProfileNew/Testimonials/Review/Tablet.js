import React from "react";
import { Box, Text, Card, Avatar } from "@advisable/donut";

function ReviewTablet({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Card p="22px" borderRadius={8}>
      <Box display="flex">
        <Box width={60} height={60} mr="m">
          <Avatar size="m" name={review.name} url={review.avatar} />
        </Box>
        <Box mt="xxs">
          <Text fontWeight="medium" fontSize="l" color="neutral900" mb="xxs">
            {review.name}
          </Text>
          <Text color="neutral600" mb="xs">
            {role} {atCompany}
          </Text>
          <Text
            fontStyle="italic"
            fontSize={17}
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

export default ReviewTablet;
