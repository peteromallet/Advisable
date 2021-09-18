import React from "react";
import { useParams } from "react-router";
import { Box, Text } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import Loading from "src/components/Loading";
import CaseStudyContent from "src/components/CaseStudyContent";
import AdvisableComment from "src/components/AdvisableComment";
import CaseStudyResultsRow from "src/components/CaseStudyResultsRow";
import CaseStudyCard from "./CaseStudyCard";
import { useCaseStudy } from "../queries";

export default function Article() {
  useScrollToTop();
  const params = useParams();
  const { data, loading, error } = useCaseStudy(params.case_study_id);
  if (loading) return <Loading />;
  const { caseStudy } = data;

  return (
    <Box position="relative">
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
