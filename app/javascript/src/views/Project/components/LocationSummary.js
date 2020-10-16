import { useTranslation } from "react-i18next";
import { Box, Text } from "@advisable/donut";

export default function GoalsSummary({ project, children }) {
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
      {children}
    </Box>
  );
}
