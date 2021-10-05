import React from "react";
import css from "@styled-system/css";
import { Text, Box, Circle } from "@advisable/donut";
import CaseStudyActions from "./CaseStudyActions";
import { StyledRecommendation, StyledRecommendationTitle } from "../styles";
import PassportAvatar from "src/components/PassportAvatar";
import { useLocation } from "react-router-dom";
import CompanyLogo from "./CompanyLogo";

export default function RecommendationCard({
  caseStudy,
  search,
  sharedArticle,
}) {
  const location = useLocation();
  let url = `/explore/articles/${caseStudy.id}?back=${location.pathname}`;
  if (search) {
    url = `${url}&search=${search.id}`;
  }

  return (
    <StyledRecommendation>
      <Box display="flex">
        <PassportAvatar
          size="xl"
          marginRight={7}
          src={caseStudy.specialist.avatar}
          name={caseStudy.specialist.name}
        >
          <Circle
            size="40px"
            bg="white"
            position="absolute"
            right="-4px"
            top="-4px"
            boxShadow="s"
          >
            <CompanyLogo src={caseStudy.company?.favicon} />
          </Circle>
        </PassportAvatar>

        <Box>
          {sharedArticle && (
            <Text fontWeight={500} mb={2} color="neutral700">
              {sharedArticle.sharedBy?.name} shared an article with you
            </Text>
          )}
          <StyledRecommendationTitle
            to={url}
            className="title"
            css={css({
              fontSize: "2xl",
              fontWeight: 600,
              marginBottom: 2,
              lineHeight: "28px",
              letterSpacing: "-0.03rem",
            })}
          >
            {caseStudy.title}
          </StyledRecommendationTitle>
          <Text
            fontSize="17px"
            lineHeight="24px"
            color="neutral900"
            className="subtitle"
            marginBottom={4}
          >
            {caseStudy.subtitle}
          </Text>
          <Box marginBottom={6}>
            {caseStudy.skills.map((as) => (
              <Box
                mb={2}
                mr={3}
                key={as.id}
                fontSize="xs"
                color="neutral700"
                fontWeight={450}
                display="inline-block"
                py={1.5}
                px={2}
                borderRadius="8px"
                bg="neutral100"
              >
                #{as.skill.name}
              </Box>
            ))}
          </Box>
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