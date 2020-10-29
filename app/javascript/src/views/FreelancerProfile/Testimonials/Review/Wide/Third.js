import React from "react";
import { Box, Text, Card, Avatar, theme } from "@advisable/donut";
import { QuoteAltLeft } from "@styled-icons/boxicons-solid";

function Third({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box my="l">
      <Box display="flex" alignItems="flex-start">
        <Box display="flex" mr="l" position="relative">
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
        <Box>
          <Box bg="neutral100" p="l" borderRadius="12px" mb="xs">
            <Text
              fontStyle="italic"
              fontSize="xl"
              lineHeight="120%"
              color="neutral800"
            >
              &quot;{review.comment}&quot;
            </Text>
            <Text
              fontWeight="medium"
              fontSize="l"
              color="neutral600"
              pt="m"
              //   pl="l"
            >
              — {review.name}
              <Text as="span" color="neutral600" fontSize="l" mb="s" pl="xs">
                {role} {atCompany}
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Third;
