import React from "react";
import { Box, Text } from "@advisable/donut";
import CaseStudyContent from "src/components/CaseStudyContent";
import CaseStudyResultsRow from "./CaseStudyResultsRow";
import AdvisableComment from "./AdvisableComment";

export default function Article({ article }) {
  return (
    <Box>
      <Text
        fontSize={{ _: "4xl", s: "5xl", m: "6xl" }}
        fontWeight={{ _: 700, m: 600 }}
        marginBottom={{ _: 4, m: 6 }}
        letterSpacing="-0.032em"
      >
        {article.title}
      </Text>
      <Text fontSize="2xl" lineHeight="28px" fontWeight={450} marginBottom={8}>
        {article.subtitle}
      </Text>
      <Box marginBottom={8}>
        <CaseStudyResultsRow caseStudy={article} />
      </Box>
      {article.comment ? (
        <Box marginTop={12}>
          <AdvisableComment>{article.comment}</AdvisableComment>
        </Box>
      ) : null}
      <Box height="1px" bg="neutral200" marginY={12} />
      <CaseStudyContent caseStudy={article} />
    </Box>
  );
}
