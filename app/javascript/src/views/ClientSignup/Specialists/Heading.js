import React from "react";
import { Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";

const Heading = ({ search, results }) => {
  const { t } = useTranslation();

  let translationKey;
  if (search.industryRequired && search.companyTypeRequired) {
    translationKey = "clientSignup.resultsHeadingWithIndustryAndType";
  } else if (search.industryRequired) {
    translationKey = "clientSignup.resultsHeadingWithIndustry";
  } else if (search.companyTypeRequired) {
    translationKey = "clientSignup.resultsHeadingWithType";
  } else {
    translationKey = "clientSignup.resultsHeading";
  }

  let text = t(translationKey, { ...search, total: results.totalCount });

  return (
    <Text as="h2" mb="xs" fontSize="xxl" lineHeight="xl" fontWeight="medium">
      {text}
    </Text>
  );
};

export default Heading;
