import React from "react";
import { useParams } from "react-router";
import { Box, Text } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import Loading from "src/components/Loading";
import CaseStudyContent from "src/components/CaseStudyContent";
import AdvisableComment from "src/components/AdvisableComment";
import CaseStudyResultsRow from "src/components/CaseStudyResultsRow";
import CaseStudyCard from "./CaseStudyCard";
import { useCaseStudy, usePartialProfileData } from "../queries";

export default function Article() {
  useScrollToTop();
  const params = useParams();
  const partialData = usePartialProfileData();
  const { data, loading, error } = useCaseStudy(params.case_study_id);
  if (partialData.loading) return <Loading />;

  const partialCaseStudy = partialData.data.specialist.caseStudies.find(
    (cs) => cs.id === params.case_study_id,
  );

  return (
    <Box position="relative">
      <Box marginBottom={12}>
        <CaseStudyCard caseStudy={partialCaseStudy} />
      </Box>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box marginBottom={12}>
            <CaseStudyResultsRow caseStudy={data.caseStudy} />
          </Box>
          <Text fontSize="2xl" lineHeight="28px" fontWeight={450}>
            {data.caseStudy.subtitle}
          </Text>
          {data.caseStudy.comment ? (
            <Box marginTop={12}>
              <AdvisableComment>{data.caseStudy.comment}</AdvisableComment>
            </Box>
          ) : null}
          <Box height="1px" bg="neutral100" marginY={12} />
          <CaseStudyContent caseStudy={data.caseStudy} />
        </>
      )}
    </Box>
  );
}
