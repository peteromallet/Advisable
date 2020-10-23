import React from "react";
import { Box, Text, Card, Avatar, theme } from "@advisable/donut";
import { QuoteAltLeft } from "@styled-icons/boxicons-solid";

function ReviewMobile({ review }) {
  return (
    <Card p="xl" borderRadius={8}>
      <Box>
        <Box width="100%" display="flex" mb="m">
          <Box position="relative">
            <Box width={60} height={60}>
              <Avatar size="m" name={review.name} url={review.avatar} />
            </Box>
            <Box zIndex="2" position="absolute" bottom="-4px" right="-8px">
              <QuoteAltLeft
                size={28}
                fill="rgba(255,255,255,0.6)"
                stroke={theme.colors.blue500}
                strokeWidth={1}
              />
            </Box>
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

export default ReviewMobile;
