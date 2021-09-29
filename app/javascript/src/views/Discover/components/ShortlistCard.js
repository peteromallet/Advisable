import React from "react";
import pluralize from "pluralize";
import css from "@styled-system/css";
import styled from "styled-components";
import { Box, Text } from "@advisable/donut";
import RecommendationAvatar from "./RecommendationAvatar";
import { useHistory } from "react-router";

const StyledShortlistCard = styled.div(
  css({
    padding: "20px",
    marginX: "-20px",
    cursor: "pointer",
    border: "2px solid transparent",
    borderRadius: "24px",
    transition: "border-color 200ms, box-shadow 200ms",
    "&:hover": {
      borderColor: "neutral100",
      boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.12)",
    },
  }),
);

export default function ShortlistCard({ shortlist, company }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/explore/${shortlist.id}`);
  };

  const placeholders = [...Array(5 - shortlist.results.nodes.length).keys()];

  return (
    <StyledShortlistCard r1={0.005} r2={0.3} onClick={handleClick}>
      <Box display={{ _: "block", l: "flex" }} justifyContent="space-between">
        <Box maxWidth={{ l: "240px" }} paddingRight={2}>
          <Text
            fontSize="3xl"
            fontWeight={600}
            marginBottom={2}
            letterSpacing="-0.032em"
          >
            {shortlist.name}
          </Text>
          <Text lineHeight="20px" color="neutral700" marginBottom={5}>
            Recommendations of {shortlist.skills[0]?.skill?.name?.toLowerCase()}{" "}
            specialists relevant for {company.industry?.name?.toLowerCase()}{" "}
            {pluralize(company.kind?.toLowerCase())}.
          </Text>
        </Box>
        <Box
          display="grid"
          gridGap={{
            _: "12px",
          }}
          gridTemplateColumns={{
            _: "1fr 1fr 1fr",
            s: "1fr 1fr 1fr 1fr 1fr",
          }}
        >
          {shortlist.results.nodes.map((result, index) => (
            <Box key={result.id}>
              <RecommendationAvatar
                size={{ _: "2xs", m: "xs" }}
                number={index + 1}
                src={result.specialist.avatar}
                name={result.specialist.name}
              />
            </Box>
          ))}
          {placeholders.map((n) => (
            <Box key={n}>
              <RecommendationAvatar size={{ _: "2xs", m: "xs" }} />
            </Box>
          ))}
        </Box>
      </Box>
    </StyledShortlistCard>
  );
}
