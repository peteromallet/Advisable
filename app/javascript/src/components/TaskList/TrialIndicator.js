import React from "react";
import { Star, ArrowRight } from "@styled-icons/feather";
import { useTranslation } from "react-i18next";
import { Tooltip, Box, Icon, Text, Link } from "@advisable/donut";

const TrialIndicator = ({ isClient }) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      interactable
      content={
        <>
          <Text fontSize="xs" mb="xs" color="white.9" lineHeight="xs">
            {t(
              `trialProgram.tooltip.title.${
                isClient ? "client" : "freelancer"
              }`,
            )}
          </Text>
          <Text fontSize="xxs" lineHeight="xs" color="white.8" mb="s">
            {t(
              `trialProgram.tooltip.description.${
                isClient ? "client" : "freelancer"
              }`,
            )}
          </Text>
          <Link.External
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            href={
              isClient
                ? "https://advisable.com/client-trial"
                : "https://advisable.com/freelancer-trial"
            }
          >
            <Text color="white.9">
              Read more information
              <ArrowRight size={16} strokeWidth={2} />
            </Text>
          </Link.External>
        </>
      }
    >
      <Box
        mr="s"
        width={28}
        height={28}
        bg="blue.0"
        display="flex"
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
        color="blue600"
      >
        <Star size={18} fill="currentColor" strokeWidth={0} />
      </Box>
    </Tooltip>
  );
};

export default TrialIndicator;
