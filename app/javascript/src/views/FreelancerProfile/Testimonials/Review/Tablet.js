import React from "react";
import { Box, Text, Avatar, theme } from "@advisable/donut";

function ReviewTablet({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box>
      <Box display="flex" alignItems="flex-start">
        <Box mr="m">
          <Avatar size="l" name={review.name} url={review.avatar} />
        </Box>
        <Box pt="2xs">
          <Box mb="xs">
            <Text fontWeight="medium" fontSize="l" color="neutral900" mb="2xs">
              {review.name}&nbsp;
            </Text>
            <Text color="neutral600" fontSize="l">
              {role} {atCompany}
            </Text>
          </Box>
          <Box bg="neutral100" p="l" pl="2xl" borderRadius="12px">
            <Box position="relative">
              <Text
                fontStyle="italic"
                fontSize="xl"
                lineHeight="130%"
                color="neutral800"
              >
                <Text
                  as="span"
                  lineHeight="14px"
                  css={`
                    font-size: 48px;
                    color: ${theme.colors.blue400};
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
                  lineHeight="12px"
                  css={`
                    font-size: 48px;
                    color: ${theme.colors.blue400};
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewTablet;
