import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import css from "@styled-system/css";
import { Box, Text, useBreakpoint } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import NotFound, { isNotFound } from "src/views/NotFound";
import CaseStudyResultsRow from "src/components/CaseStudyResultsRow";
import CaseStudyContent from "src/components/CaseStudyContent";
import Loading from "src/components/Loading";
import CaseStudyCard from "../components/CaseStudyCard";
import Sidebar from "../components/Sidebar";
import { useCaseStudy } from "../queries";

function ArticleContent() {
  const params = useParams();
  const { data, loading, error } = useCaseStudy(params.case_study_id);

  if (isNotFound(error)) {
    return <NotFound />;
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

function Article({ isOwner, profileData }) {
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

  if (!partialCaseStudy) {
    return <NotFound />;
  }

  return (
    <Box
      display="flex"
      flexDirection={{ _: "column", l: "row" }}
      px={{ xs: 7, s: 9, l: 11, xl: 14 }}
      maxWidth={{ s: "700px", l: "none" }}
      css={css({ columnGap: 8 })}
    >
      {lUp ? (
        <Sidebar
          isOwner={isOwner}
          data={profileData}
          top={{ l: "88px", xl: "96px" }}
        />
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

Article.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

export default Article;
