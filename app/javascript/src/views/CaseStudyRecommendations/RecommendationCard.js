import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { Text, Box } from "@advisable/donut";
import ArchiveButton from "./ArchiveButton";
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
    <StyledRecommendationCard
      display="flex"
      borderRadius="16px"
      padding={6}
      zIndex={zIndex}
      alignItems="center"
      onClick={handleClick}
    >
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
      <StyledRecommendationCardActions>
        <ArchiveButton search={search} article={caseStudy} />
      </StyledRecommendationCardActions>
    </StyledRecommendationCard>
  );
}
