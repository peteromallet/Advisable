import React from "react";
import { Box, Text, Avatar, theme } from "@advisable/donut";

function ReviewMobile({ review }) {
  const role = review.role;
  const atCompany = review.companyName && `at ${review.companyName}`;
  return (
    <Box>
      <Box display="flex" alignItems="flex-start">
        <Box mt="s" zIndex="2">
          <Box
            width={68}
            height={68}
            bg="neutral50"
            borderWidth="4px"
            borderStyle="solid"
            borderRadius="32px"
            borderColor="neutral50"
            // border={`4px solid ${theme.colors.neutral500}`}
          >
            <Avatar size="m" name={review.name} url={review.avatar} />
          </Box>
        </Box>
        <Box bg="neutral100" p="m" pl="3xl" borderRadius="12px" ml="-24px">
          <Box position="relative">
            <Text
              fontStyle="italic"
              fontSize="l"
              lineHeight="130%"
              color="neutral800"
              mb="xs"
            >
              <Text
                as="span"
                lineHeight="14px"
                css={`
                  font-size: 36px;
                  color: ${theme.colors.blue400};
                  position: absolute;
                  top: 5px;
                  left: -18px;
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
                  font-size: 36px;
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
            <Text color="neutral600" lineHeight="130%">
              <Text
                as="span"
                fontWeight="medium"
                css={`
                  position: absolute;
                  left: -14px;
                  opacity: 0.6;
                  vertical-align: bottom;
                  color: ${theme.colors.neutral700};
                `}
              >
                —
              </Text>{" "}
              <Text as="span" fontWeight="medium" color="neutral700">
                {review.name}{" "}
              </Text>
              {role} {atCompany}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ReviewMobile;
