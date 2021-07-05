import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { Text, Box, Circle } from "@advisable/donut";
import {
  StyledRecommendationTitle,
  StyledRecommendationCardAvatar,
} from "./styles";

export default function RecommendationCard({ caseStudy }) {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push(`/explore/${caseStudy.id}`);
  }, [history, caseStudy]);

  return (
    <>
      <Box display="flex" onClick={handleClick} alignItems="center">
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
            <img src={caseStudy.favicon} width="16px" />
          </Circle>
        </StyledRecommendationCardAvatar>
        <Box>
          <StyledRecommendationTitle
            mb={2}
            as={Link}
            fontSize="2xl"
            fontWeight={600}
            className="title"
            lineHeight="24px"
            letterSpacing="-0.03rem"
            to={`/explore/${caseStudy.id}`}
          >
            {caseStudy.title}
          </StyledRecommendationTitle>
          <Text mb={4} fontSize="md" color="neutral500">
            {caseStudy.specialist.name}
          </Text>
          <Text lineHeight="20px" color="neutral900" className="subtitle">
            {caseStudy.subtitle}
          </Text>
        </Box>
      </Box>
    </>
  );
}
