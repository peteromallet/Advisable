import React from "react";
import { Box, Text } from "@advisable/donut";
import CaseStudyContent from "src/components/CaseStudyContent";
import AdvisableComment from "src/components/AdvisableComment";
import CaseStudyCard from "./CaseStudyCard";
import CaseStudyResultsRow from "src/components/CaseStudyResultsRow";
import { useCaseStudy } from "../queries";
import { useParams } from "react-router";
import Loading from "src/components/Loading";

export default function Article() {
  const params = useParams();
  const { data, loading, error } = useCaseStudy(params.case_study_id);
  if (loading) return <Loading />;
  const { caseStudy } = data;

  return (
    <Box maxWidth="700px" position="relative">
      <Box marginBottom={12}>
        <CaseStudyCard caseStudy={caseStudy} />
      </Box>
      <Box marginBottom={12}>
        <CaseStudyResultsRow caseStudy={caseStudy} />
      </Box>
      <Text fontSize="2xl" lineHeight="28px" fontWeight={450}>
        {caseStudy.subtitle}
      </Text>
      {caseStudy.comment ? (
        <Box marginTop={12}>
          <AdvisableComment>{caseStudy.comment}</AdvisableComment>
        </Box>
      ) : null}
      <Box height="1px" bg="neutral100" marginY={12} />
      <CaseStudyContent caseStudy={caseStudy} />
    </Box>
  );
}
