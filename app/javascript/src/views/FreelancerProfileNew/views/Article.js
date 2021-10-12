import React, { useMemo } from "react";
import { useParams } from "react-router";
import { Box, Text, useBreakpoint } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import CaseStudyContent from "src/components/CaseStudyContent";
import CaseStudyResultsRow from "src/components/CaseStudyResultsRow";
import Sidebar from "../components/Sidebar";
import CaseStudyCard from "../components/CaseStudyCard";
import { useCaseStudy } from "../queries";

function ArticleContent() {
  const params = useParams();
  const { data, loading, error } = useCaseStudy(params.case_study_id);

  if (isNotFound(error)) {
    return <div>Article not found</div>;
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <Box marginBottom={12}>
        <CaseStudyResultsRow caseStudy={data.caseStudy} />
      </Box>
      <Text fontSize="2xl" lineHeight="28px" fontWeight={450}>
        {data.caseStudy.subtitle}
      </Text>
      <Box height="1px" bg="neutral100" marginY={12} />
      <CaseStudyContent caseStudy={data.caseStudy} />
    </>
  );
}

export default function Article({ profileData }) {
  useScrollToTop();
  const params = useParams();
  const lUp = useBreakpoint("lUp");

  const partialCaseStudy = useMemo(
    () =>
      profileData.specialist.caseStudies.find(
        (cs) => cs.id === params.case_study_id,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.case_study_id],
  );

  return (
    <Box
      display="flex"
      flexDirection={{ _: "column", l: "row" }}
      px={{ xs: 7, s: 9, l: 11, xl: 14 }}
      maxWidth={{ s: "700px", l: "none" }}
    >
      {lUp ? (
        <Sidebar data={profileData} top={{ l: "80px", xl: "88px" }} />
      ) : null}
      <Box position="relative" width="100%">
        <Box marginBottom={12}>
          <CaseStudyCard caseStudy={partialCaseStudy} />
        </Box>
        <ArticleContent />
      </Box>
    </Box>
  );
}
