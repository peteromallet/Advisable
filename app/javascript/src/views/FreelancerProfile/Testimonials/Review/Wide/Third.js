import React from "react";
import { Box, Text, Avatar, theme } from "@advisable/donut";

function Third({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box my="l">
      <Box display="flex" position="relative" alignItems="flex-start">
        <Box
          display="flex"
          position="absolute"
          top="m"
          border={`4px solid ${theme.colors.neutral50}`}
          borderRadius="50%"
          zIndex="2"
        >
          <Box width={100} height={100}>
            <Avatar size="xl" name={review.name} url={review.avatar} />
          </Box>
        </Box>
        <Box pl="4xl">
          <Box bg="neutral100" p="2xl" pl="5xl" borderRadius="12px" mb="xs">
            <Box position="relative">
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
                    top: 6px;
                    left: -22px;
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
    </Box>
  );
}

export default Third;
