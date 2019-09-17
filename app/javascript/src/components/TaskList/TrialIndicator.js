import React from "react";
import Tooltip from "../Tooltip";
import { useTranslation } from "react-i18next";
import { Box, Icon, Text } from "@advisable/donut";

const TrialIndicator = ({ isClient }) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      content={
        <Box padding="xs">
          <Text fontSize="xs" mb="xs" color="white.9">
            {t(
              `trialProgram.tooltip.title.${isClient ? "client" : "freelancer"}`
            )}
          </Text>
          <Text fontSize="xxs" lineHeight="xxs" color="white.8">
            {t(
              `trialProgram.tooltip.description.${
                isClient ? "client" : "freelancer"
              }`
            )}
          </Text>
        </Box>
      }
    >
      <Box
        mr="xs"
        width={28}
        height={28}
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
