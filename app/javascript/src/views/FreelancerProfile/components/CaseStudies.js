import PropTypes from "prop-types";
import React from "react";
import * as Sentry from "@sentry/react";
import { Link, Box, Stack } from "@advisable/donut";
import CardButton from "src/components/CardButton";
import SectionTitle from "./SectionTitle";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudiesEmptyState from "./CaseStudiesEmptyState";

function CaseStudies({ caseStudies, specialist, isOwner }) {
  const cards = caseStudies.map((cs) => (
    <Sentry.ErrorBoundary key={cs.id}>
      <CaseStudyCard caseStudy={cs} isOwner={isOwner} />
    </Sentry.ErrorBoundary>
  ));

  const isEmpty = cards.length === 0;

  if (isEmpty && !isOwner) return null;

  return (
    <Box mb={11}>
      <SectionTitle>Case Studies</SectionTitle>
      <Stack spacing={6} mt={3}>
        {cards}
      </Stack>
      {isEmpty && isOwner && <CaseStudiesEmptyState specialist={specialist} />}
      {!isEmpty && isOwner && (
        <CardButton
          as={Link.External}
          href={`https://csi.advisable.com/freelancer/onboarding?specialist_id=${specialist.id}&contact_name=${specialist.firstName}`}
          target="_blank"
          mt={6}
          paddingY={6}
        >
          Add a Case Study
        </CardButton>
      )}
    </Box>
  );
}

CaseStudies.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

export default CaseStudies;
