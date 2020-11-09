import React from "react";
import { Box, Text, Avatar, theme, useBreakpoint } from "@advisable/donut";

function ClientText({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box>
      <Text
        fontWeight="medium"
        fontSize={["m", "l"]}
        color="neutral900"
        mb="2xs"
      >
        {review.name}&nbsp;
      </Text>
      <Text color="neutral600" fontSize={["m", "l"]}>
        {role} {atCompany}
      </Text>
    </Box>
  );
}

function ClientAvatar({ review }) {
  return (
    <Box mr={["s", "m", "xl"]}>
      <Avatar
        size={["s", "l", "xl", "xl"]}
        name={review.name}
        url={review.avatar}
      />
    </Box>
  );
}

function Review({ review }) {
  const isWidescreen = useBreakpoint("sUp");
  return (
    <Box>
      <Box display="flex" alignItems="flex-start">
        {isWidescreen && <ClientAvatar review={review} />}
        <Box pt="2xs">
          <Box display="flex" alignItems="center" mb="xs">
            {!isWidescreen && <ClientAvatar review={review} />}
            <ClientText review={review} />
          </Box>
          <Box
            bg="neutral100"
            p={["m", "l"]}
            pl={["xl", "2xl"]}
            borderRadius="12px"
          >
            <Box position="relative">
              <Text
                fontStyle="italic"
                fontSize={["m", "xl"]}
                lineHeight="130%"
                color="neutral800"
              >
                <Text
                  as="span"
                  lineHeight="14px"
                  css={`
                    font-size: ${isWidescreen ? "48px" : "36px"};
                    color: ${theme.colors.blue400};
                    position: absolute;
                    top: 5px;
                    left: ${isWidescreen ? "-24px" : "-18px"};
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
                    font-size: ${isWidescreen ? "48px" : "36px"};
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

export default Review;
