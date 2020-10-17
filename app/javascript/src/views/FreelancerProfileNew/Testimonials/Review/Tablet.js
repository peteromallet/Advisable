import React from "react";
import { Box, Text, Card, Avatar, theme } from "@advisable/donut";
import { QuoteAltLeft } from "@styled-icons/boxicons-solid";

function ReviewTablet({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Card p="22px" borderRadius={8}>
      <Box display="flex" alignItems="flex-start">
        <Box display="flex" mr="24px" position="relative">
          <Box width={60} height={60}>
            <Avatar size="m" name={review.name} url={review.avatar} />
          </Box>
          <Box zIndex="2" position="absolute" bottom="-2px" right="-10px">
            <QuoteAltLeft
              size={28}
              fill="rgba(255,255,255,0.6)"
              stroke={theme.colors.blue500}
              strokeWidth={1}
            />
          </Box>
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
