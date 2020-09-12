import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Text, Tags } from "@advisable/donut";

export default function GoalsSummary({ project, children }) {
  const { t } = useTranslation();

  const { primarySkill, user } = project;
  const industry = user.industry.name;
  const companyType = user.companyType;

  let heading = "Project Skills";

  if (project.industryExperienceImportance) {
    heading = t(
      `industryExperienceImportance.${project.industryExperienceImportance}`,
      {
        primarySkill: primarySkill.name,
        companyType,
        industry,
      },
    );
  }

  return (
    <Box>
      <Text
        mb="s"
        fontSize="xl"
        color="neutral900"
        fontWeight="medium"
        textTransform="capitalize"
        letterSpacing="-0.024rem"
      >
        {heading}
      </Text>
      <Tags
        size="m"
        marginBottom="l"
        tags={project.skills.map((s) => s.name)}
      />
      {children}
    </Box>
  );
}
