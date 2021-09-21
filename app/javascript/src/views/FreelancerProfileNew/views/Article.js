import React from "react";
import { useParams } from "react-router";
import { Box, Text, useBreakpoint } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import NotFound, { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import CaseStudyContent from "src/components/CaseStudyContent";
import AdvisableComment from "src/components/AdvisableComment";
import CaseStudyResultsRow from "src/components/CaseStudyResultsRow";
import Sidebar from "../components/Sidebar";
import CaseStudyCard from "../components/CaseStudyCard";
import { useCaseStudy, usePartialProfileData } from "../queries";

export default function Article() {
  useScrollToTop();
  const params = useParams();
  const partialData = usePartialProfileData();
  const { data, loading, error } = useCaseStudy(params.case_study_id);
  const lUp = useBreakpoint("lUp");

  if (partialData.loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const partialCaseStudy = partialData.data.specialist.caseStudies.find(
    (cs) => cs.id === params.case_study_id,
  );

  return (
    <Box
      display="flex"
      flexDirection={{ _: "column", l: "row" }}
      px={{ xs: 7, s: 9, l: 11, xl: 14 }}
      maxWidth={{ s: "700px", l: "none" }}
    >
      {lUp ? (
        <Sidebar data={partialData.data} top={{ l: "80px", xl: "88px" }} />
      ) : null}
      <Box position="relative" width="100%">
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
    </Box>
  );
}
