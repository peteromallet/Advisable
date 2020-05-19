import React from "react";
import { Box, Text } from "@advisable/donut";

function CurrentlyOnHold() {
  return (
    <Box
      padding="30px"
      border="1px solid"
      borderColor="neutral100"
      textAlign="center"
    >
      <Box color="neutral200" mb="16px">
        <svg fill="currentColor" viewBox="0 0 20 20" width="40px">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Box>
      <Text
        mb="8px"
        color="blue900"
        fontSize="24px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        On Hold
      </Text>
      <Text fontSize="14px" lineHeight="1.3em" color="neutral700">
        Only spend time filling out a full application when you have a project
        waiting for you.
      </Text>
      <Box
        my="32px"
        px="8px"
        bg="blue100"
        height="24px"
        color="blue600"
        fontSize="14px"
        fontWeight="500"
        borderRadius="8px"
        alignItems="center"
        display="inline-flex"
      >
        Your Account
      </Box>
      <Text
        fontSize="13px"
        lineHeight="1.4em"
        color="neutral700"
        letterSpacing="-0.02rem"
      >
        We’ll let you know when we have project for you. Accepted freelancers
        get priority on projects.
      </Text>
    </Box>
  );
}

export default CurrentlyOnHold;
