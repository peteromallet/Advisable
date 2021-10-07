import React from "react";
import useViewer from "src/hooks/useViewer";
import { Link, Box, Stack } from "@advisable/donut";
import SectionTitle from "./SectionTitle";
import CaseStudyCard from "./CaseStudyCard";
import SectionActionButton from "./SectionActionButton";

export default function CaseStudies({ caseStudies, specialist }) {
  const viewer = useViewer();
  const isOwner = viewer?.id === specialist.id;

  const cards = caseStudies.map((cs) => (
    <CaseStudyCard caseStudy={cs} key={cs.id} />
  ));

  return (
    <Box>
      <SectionTitle>Case Studies</SectionTitle>
      <Stack spacing={6} mt={3}>
        {cards}
      </Stack>
      {isOwner ? (
        <SectionActionButton
          as={Link.External}
          href={`https://csi.advisable.com/freelancer/onboarding?specialist_id=${specialist.id}&contact_name=${specialist.firstName}`}
          target="_blank"
          mt={6}
        >
          Add a Case Study
        </SectionActionButton>
      ) : null}
    </Box>
  );
}
