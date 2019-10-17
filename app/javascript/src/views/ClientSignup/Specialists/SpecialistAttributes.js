import React from "react";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";
import StarRating from "../../../components/StarRating";
import currency from "../../../utilities/currency";

const SpecialistAttributes = ({ specialist }) => {
  const { t } = useTranslation();

  return (
    <Box my="m" display="flex">
      <Box pr="s" borderRight="1px solid" borderColor="neutral.2">
        <Text fontWeight="medium" color="neutral.9" mb="xxs">
          {currency(specialist.hourlyRate, { format: "$0" })}
        </Text>
        <Text fontSize="xxs" color="neutral.5">
          Per Hour
        </Text>
      </Box>
      <Box px="s" borderRight="1px solid" borderColor="neutral.2">
        <Text fontWeight="medium" color="neutral.9" mb="xxs">
          {specialist.previousProjectsCount}
        </Text>
        <Text fontSize="xxs" color="neutral.5">
          Projects
        </Text>
      </Box>
      <Box pl="s">
        <StarRating
          showNumber={false}
          size="s"
          rating={specialist.ratings.overall}
        />
        <Text fontSize="xxs" color="neutral.5" mt="1px">
          {t("nouns.reviewCount", { count: specialist.reviewsCount || 0 })}
        </Text>
      </Box>
    </Box>
  );
};

export default SpecialistAttributes;
