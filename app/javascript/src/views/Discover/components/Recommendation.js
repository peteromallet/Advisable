import React, { useRef } from "react";
import styled from "styled-components";
import css from "@styled-system/css";
import { Box, Text } from "@advisable/donut";
import RecommendationAvatar from "./RecommendationAvatar";
import ArchiveButton from "./ArchiveButton";
import MessageFreelancerButton from "./MessageButton";

const StyledRecommendationTitle = styled(Text)(
  css({
    fontWeight: 560,
    marginBottom: 3,
    paddingRight: "32px",
    letterSpacing: "-0.025em",
    transition: "color 200ms",
  }),
);

const StyledRecommendation = styled.div(
  css({
    padding: "20px",
    margin: "-20px",
    cursor: "pointer",
    borderRadius: "32px",
    border: "2px solid transparent",
    transition: "border-color 200ms, box-shadow 200ms",
    "&:hover": {
      borderColor: "neutral100",
      boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.12)",
      [StyledRecommendationTitle]: {
        color: "blue700",
      },
    },
  }),
);

export default function Recommendation({
  recommendation,
  search,
  number,
  onClick,
}) {
  const container = useRef(null);

  const handleClick = (e) => {
    if (container.current.contains(e.target)) {
      onClick(recommendation);
    }
  };

  const stopActionPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div ref={container}>
      <StyledRecommendation onClick={handleClick}>
        <Box display={{ _: "block", s: "flex" }} alignItems="center">
          <Box flexShrink={0} marginRight={6} marginBottom={{ _: 5, m: 0 }}>
            <RecommendationAvatar
              number={number}
              size={{ _: "md", l: "lg" }}
              name={recommendation.specialist.name}
              src={recommendation.specialist.avatar}
            />
          </Box>
          <Box>
            <StyledRecommendationTitle
              fontSize={{ _: "22px", m: "24px", l: "26px" }}
              lineHeight={{ _: "24px", l: "28px" }}
            >
              {recommendation.title}
            </StyledRecommendationTitle>
            <Text
              fontSize={{ _: "md", m: "lg" }}
              lineHeight="24px"
              marginBottom={6}
            >
              {recommendation.comment}
            </Text>
            <Box onClick={stopActionPropagation}>
              <MessageFreelancerButton
                mr={3}
                specialist={recommendation.specialist}
              />
              <ArchiveButton article={recommendation} search={search} />
            </Box>
          </Box>
        </Box>
      </StyledRecommendation>
    </div>
  );
}
