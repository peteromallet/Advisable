import React from "react";
import { Text, Box, Circle } from "@advisable/donut";
import CaseStudyActions from "./CaseStudyActions";
import LogoMark from "src/components/LogoMark";
import {
  StyledRecommendation,
  StyledRecommendationTitle,
  StyledRecommendationCardAvatar,
} from "./styles";

export default function RecommendationCard({
  caseStudy,
  search,
  sharedArticle,
}) {
  let url = `/case_Studies/${caseStudy.id}`;
  if (search) {
    url = `${url}?search=${search.id}`;
  }

  return (
    <StyledRecommendation>
      <Box display="flex">
        <StyledRecommendationCardAvatar
          mr={6}
          flexShrink={0}
          style={{
            backgroundImage: `url(${caseStudy.specialist.avatar})`,
          }}
        >
          <Circle
            size="40px"
            bg="white"
            position="absolute"
            right="-8px"
            top="-8px"
          >
            {caseStudy.company?.favicon ? (
              <img src={caseStudy.company.favicon} width="16px" />
            ) : (
              <LogoMark size={16} color="subtle" />
            )}
          </Circle>
        </StyledRecommendationCardAvatar>
        <Box>
          {sharedArticle && (
            <Text fontWeight={500} mb={2} color="neutral700">
              {sharedArticle.sharedBy?.name} shared an article with you
            </Text>
          )}
          <StyledRecommendationTitle
            mb={2}
            target="_blank"
            fontSize="2xl"
            fontWeight={600}
            className="title"
            lineHeight="24px"
            letterSpacing="-0.03rem"
            href={url}
          >
            {caseStudy.title}
          </StyledRecommendationTitle>
          <Text mb={4} fontSize="md" color="neutral500">
            {caseStudy.specialist.name}
          </Text>
          <Text
            lineHeight="20px"
            color="neutral900"
            className="subtitle"
            marginBottom={6}
          >
            {caseStudy.subtitle}
          </Text>
          {sharedArticle?.message && (
            <Box
              padding={3}
              bg="neutral100"
              borderRadius="12px"
              marginBottom={6}
            >
              <Text fontSize="sm" fontWeight={500} mb={1} color="neutral500">
                {sharedArticle.sharedBy?.name}
              </Text>
              <Text fontSize="sm" lineHeight="20px" color="neutral800">
                &quot;{sharedArticle.message}&quot;
              </Text>
            </Box>
          )}
          <CaseStudyActions searchId={search?.id} caseStudy={caseStudy} />
        </Box>
      </Box>
    </StyledRecommendation>
  );
}
