import React from "react";
import { Box, Text, Card, Avatar } from "@advisable/donut";
import { QuoteAltLeft } from "@styled-icons/boxicons-solid";

function ReviewWide({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Card p="36px" borderRadius={8}>
      <Box display="flex" alignItems="flex-start">
        <Box display="flex" mr="32px" position="relative">
          <Box width={100} height={100}>
            <Avatar size="xl" name={review.name} url={review.avatar} />
          </Box>
          <Box
            color="red300"
            zIndex="2"
            position="absolute"
            bottom="0px"
            right="-18px"
          >
            <QuoteAltLeft size={48} />
          </Box>
        </Box>
        <Box mt="8px">
          <Text fontWeight="medium" fontSize="xl" color="neutral900" mb="xs">
            {review.name}
          </Text>
          <Text color="neutral600" fontSize="l" mb="s">
            {role} {atCompany}
          </Text>
          <Text
            fontStyle="italic"
            fontSize="xl"
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
