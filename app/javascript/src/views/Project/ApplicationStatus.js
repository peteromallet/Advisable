import React from "react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import {
  Call,
  ChatbubbleEllipses,
  Calendar,
  CheckmarkCircle,
} from "@styled-icons/ionicons-solid";
import { Text, Box } from "@advisable/donut";

const ICONS = {
  "Application Accepted": Call,
  "Interview Scheduled": Calendar,
  "Interview Completed": CheckmarkCircle,
  Proposed: ChatbubbleEllipses,
};

export default function ApplicationStatus({ application }) {
  const { t } = useTranslation();
  const Icon = ICONS[application.status];
  const specialistName = application.specialist.firstName;
  const interviewDate = React.useMemo(() => {
    const startsAt = application.interview?.startsAt;
    if (!startsAt) return null;
    return DateTime.fromISO(startsAt).toFormat("dd MMMM yyyy");
  }, [application.interview]);

  return (
    <Box padding="sm" borderRadius="12px" bg="neutral100">
      <Box
        fontSize="sm"
        fontWeight="medium"
        marginBottom="6px"
        color="neutral800"
        display="flex"
        alignItems="center"
      >
        {Icon && (
          <Box display="inline" paddingRight="4px" color="neutral700">
            <Icon size="16px" />
          </Box>
        )}
        {t(`applicationStatus.${application.status}.title`, {
          specialistName,
        })}
      </Box>
      <Text fontSize="xs" lineHeight="16px" color="neutral700">
        {t(`applicationStatus.${application.status}.description`, {
          specialistName,
          interviewDate,
        })}
      </Text>
    </Box>
  );
}
