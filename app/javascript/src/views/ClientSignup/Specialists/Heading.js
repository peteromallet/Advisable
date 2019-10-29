import React from "react";
import { Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";

const Heading = ({ search, results }) => {
  const { t } = useTranslation();

  let translationKey;
  if (search.industryRequired && search.companyTypeRequired) {
    translationKey = "clientSignup.resultsSubHeadingWithIndustryAndType";
  } else if (search.industryRequired) {
    translationKey = "clientSignup.resultsSubHeadingWithIndustry";
  } else if (search.companyTypeRequired) {
    translationKey = "clientSignup.resultsSubHeadingWithType";
  } else {
    translationKey = "clientSignup.resultsSubHeading";
  }

  let text = t(translationKey, { ...search, count: results.nodes.length });

  return (
    <Text fontSize="s" lineHeight="s" color="neutral.7">
      {text}
    </Text>
  );
};

export default Heading;
