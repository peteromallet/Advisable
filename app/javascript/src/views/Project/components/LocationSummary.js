import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Text, Button } from "@advisable/donut";
import { Pencil } from "@styled-icons/ionicons-solid";

export default function GoalsSummary({ project }) {
  const { t } = useTranslation();

  return (
    <Box>
      <Text
        mb="s"
        fontSize="xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.024rem"
      >
        Location Preferences
      </Text>
      <Text color="neutral700" marginBottom="m">
        {t(`locationImportance.${project.locationImportance}`, {
          location: project.user.location,
        })}
      </Text>
      <Button size="s" prefix={<Pencil />} variant="subtle">
        Edit Location
      </Button>
    </Box>
  );
}
