import React from "react";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import StarRating from "../StarRating";
import currency from "../../utilities/currency";

const Attributes = ({ specialist }) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" my="m">
      <Box width={1 / 3.8} mr="xs">
        <Box py="8px" px="12px" bg="neutral.1" borderRadius={12}>
          <Text
            mb="2px"
            fontSize="18px"
            color="blue.8"
            fontWeight="medium"
            letterSpacing="-0.04em"
          >
            {currency(specialist.hourlyRate, { format: "$0" })}
          </Text>
          <Text fontSize="xxs" color="neutral.6" letterSpacing="-0.01em">
            Per Hour
          </Text>
        </Box>
      </Box>

      <Box width={1 / 3.8} mr="xs">
        <Box py="8px" px="12px" bg="neutral.1" borderRadius={12}>
          <Text
            mb="2px"
            fontSize="18px"
            color="blue.8"
            fontWeight="medium"
            letterSpacing="-0.04em"
          >
            {specialist.previousProjectsCount}
          </Text>
          <Text fontSize="xxs" color="neutral.6" letterSpacing="-0.01em">
            Projects
          </Text>
        </Box>
      </Box>
      {/* <Box px="s">
        <Text fontWeight="medium" color="neutral.9" mb="xxs">
        </Text>
        <Text fontSize="xxs" color="neutral.5">
          Projects
        </Text>
      </Box>
      {specialist.ratings.overall > 0 && (
        <Box pl="s" borderLeft="1px solid" borderColor="neutral.2">
          <StarRating
            showNumber={false}
            size="s"
            rating={specialist.ratings.overall}
          />
          <Text fontSize="xxs" color="neutral.5" mt="1px">
            {t("nouns.reviewCount", { count: specialist.reviewsCount || 0 })}
          </Text>
        </Box>
      )} */}
    </Box>
  );
};

export default Attributes;
