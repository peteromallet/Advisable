import React from "react";
import useViewer from "src/hooks/useViewer";
import { Link, Box, Stack } from "@advisable/donut";
import SectionTitle from "./SectionTitle";
import CaseStudyCard from "./CaseStudyCard";
import SectionActionButton from "./SectionActionButton";
import CaseStudiesEmptyState from "./CaseStudiesEmptyState";

export default function CaseStudies({ caseStudies, specialist }) {
  const viewer = useViewer();

  const cards = caseStudies.map((cs) => (
    <CaseStudyCard caseStudy={cs} key={cs.id} />
  ));

  const isOwner = viewer?.id === specialist.id;
  const isEmpty = cards.length === 0;

  if (isEmpty && !isOwner) return null;

  return (
    <Box mb={11}>
      <SectionTitle>Case Studies</SectionTitle>
      <Stack spacing={6} mt={3}>
        {cards}
      </Stack>
      {isEmpty ? (
        <CaseStudiesEmptyState specialist={specialist} />
      ) : (
        <SectionActionButton
          as={Link.External}
          href={`https://csi.advisable.com/freelancer/onboarding?specialist_id=${specialist.id}&contact_name=${specialist.firstName}`}
          target="_blank"
          mt={6}
        >
          Add a Case Study
        </SectionActionButton>
      )}
    </Box>
  );
}
