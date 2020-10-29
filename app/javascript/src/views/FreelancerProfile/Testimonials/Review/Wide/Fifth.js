import React from "react";
import { Box, Text, Avatar, theme } from "@advisable/donut";
import { QuoteAltLeft } from "@styled-icons/boxicons-solid";

function Fifth({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box mb="l">
      <Box display="flex" alignItems="flex-start">
        <Box display="flex" mr="32px" position="relative">
          <Box width={100} height={100}>
            <Avatar size="xl" name={review.name} url={review.avatar} />
          </Box>
          <Box zIndex="2" position="absolute" bottom="2px" right="-12px">
            <QuoteAltLeft
              size={38}
              fill="rgba(255,255,255,0.6)"
              stroke={theme.colors.blue500}
              strokeWidth={1}
            />
          </Box>
        </Box>
        <Box mt="8px">
          <Text fontWeight="medium" fontSize="xl" color="neutral900" mb="2xs">
            {review.name}
          </Text>
          <Text color="neutral600" fontSize="l" mb="s">
            {role} {atCompany}
          </Text>
          <Box bg="neutral100" p="l" borderRadius="12px">
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
      </Box>
    </Box>
  );
}

export default Fifth;
