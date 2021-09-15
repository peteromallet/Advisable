import React from "react";
import { Box, Text, Link } from "@advisable/donut";
import { useLocation } from "react-router";

export default function CaseStudy({ caseStudy }) {
  const location = useLocation();

  return (
    <Link to={`${location.pathname}/case_studies/${caseStudy.id}`}>
      <Box
        p={7}
        bg="neutral100"
        backgroundImage={`url(${caseStudy.coverPhoto})`}
        backgroundSize="cover"
        borderRadius="20px"
      >
        <Text
          textTransform="uppercase"
          fontSize="13px"
          fontWeight="semibold"
          color="neutral900"
          mb={1}
        >
          {caseStudy.companyType}
        </Text>
        <Text
          fontSize="5xl"
          fontWeight="semibold"
          letterSpacing="-0.02rem"
          color="neutral900"
        >
          {caseStudy.title}
        </Text>
      </Box>
    </Link>
  );
}
