import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { Text, Box } from "@advisable/donut";
import CaseStudyActions from "./CaseStudyActions";
import {
  StyledRecommendationCard,
  StyledRecommendationCardAvatar,
  StyledRecommendationCardActions,
} from "./styles";

export default function RecommendationCard({ search, caseStudy, zIndex }) {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push(`/explore/${search.id}/${caseStudy.id}`);
  }, [history, search, caseStudy]);

  return (
    <StyledRecommendationCard borderRadius="16px" padding={6} zIndex={zIndex}>
      <Box display="flex" onClick={handleClick} alignItems="center">
        <StyledRecommendationCardAvatar
          mr={6}
          flexShrink={0}
          style={{
            backgroundImage: `url(${caseStudy.specialist.avatar})`,
          }}
        />
        <Box>
          <Text
            mb={3}
            fontSize="2xl"
            fontWeight={500}
            className="title"
            lineHeight="24px"
            letterSpacing="-0.03rem"
          >
            {caseStudy.title}
          </Text>
          <Text
            fontSize="16px"
            lineHeight="20px"
            color="neutral800"
            className="subtitle"
          >
            {caseStudy.subtitle}
          </Text>
        </Box>
      </Box>
      <StyledRecommendationCardActions>
        <CaseStudyActions search={search} caseStudy={caseStudy} />
      </StyledRecommendationCardActions>
    </StyledRecommendationCard>
  );
}
