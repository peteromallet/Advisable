import React from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { Box, Text } from "@advisable/donut";
import { useTranslation } from "react-i18next";

const Heading = ({ results }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const search = queryString.parse(location.search, { parseBooleans: true });

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

  let text = t(translationKey, { ...search, count: results.length });

  return (
    <Box mb="xl">
      <Text color="neutral.9" lineHeight="m" letterSpacing="-0.01em">
        {text}
      </Text>
    </Box>
  );
};

export default Heading;
