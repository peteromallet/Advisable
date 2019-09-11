import React from "react";
import Tooltip from "../Tooltip";
import { Box, Icon, Text } from "@advisable/donut";

const TrialIndicator = () => {
  return (
    <Tooltip
      content={
        <Box padding="xs">
          <Text fontSize="xs" mb="xs">
            This is a risk-free trial task
          </Text>
          <Text fontSize="xxs" lineHeight="xxs" color="white.8">
            Advisable offers clients a risk-free trial period of up to 8 hours
            when working with a new freelancer. If you're not entirely satisfied
            during this period, you will not be charged for any work done and we
            will find you a replacement freelancer free of charge. The only
            requirement is that you provide us with feedback as per Advisable's
            Professional Standards.
          </Text>
        </Box>
      }
    >
      <Box
        mr="xs"
        width={30}
        height={30}
        bg="blue.0"
        display="flex"
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
      >
        <Icon
          icon="star"
          width={18}
          color="blue.5"
          fill="currentColor"
          strokeWidth={0}
        />
      </Box>
    </Tooltip>
  );
};

export default TrialIndicator;
