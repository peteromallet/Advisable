import React from "react";
import { Box, Text, Avatar, theme } from "@advisable/donut";

function Second({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box p="36px" bg="neutral100" borderRadius={12}>
      <Box display="flex" alignItems="flex-start">
        <Box
          mr="2xl"
          border={`4px solid ${theme.colors.neutral50}`}
          borderRadius="50%"
        >
          <Box width={100} height={100}>
            <Avatar size="xl" name={review.name} url={review.avatar} />
          </Box>
        </Box>
        <Box mt="s" position="relative">
          <Text
            fontStyle="italic"
            fontSize="xl"
            lineHeight="130%"
            color="neutral800"
          >
            <Text
              as="span"
              fontSize="5xl"
              lineHeight="14px"
              color="yellow500"
              css={`
                font-size: 48px;
                color: ${theme.colors.blue500};
                position: absolute;
                top: 5px;
                left: -24px;
                opacity: 0.6;
                vertical-align: bottom;
              `}
            >
              &quot;
            </Text>
            {review.comment}
            <Text
              as="span"
              fontSize="36px"
              lineHeight="12px"
              color="yellow500"
              css={`
                font-size: 48px;
                color: ${theme.colors.blue500};
                position: relative;
                top: 6px;
                right: 4px;
                opacity: 0.6;
                vertical-align: bottom;
              `}
            >
              &quot;
            </Text>
          </Text>
          <Text fontWeight="medium" fontSize="l" color="neutral600" pt="m">
            <Text
              color="neutral600"
              fontWeight="medium"
              css={`
                position: absolute;
                left: -16px;
              `}
            >
              —
            </Text>
            {review.name}
            <Text as="span" color="neutral600" fontSize="l" mb="s" pl="xs">
              {role} {atCompany}
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default Second;
