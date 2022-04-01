import React from "react";
import css from "@styled-system/css";
import styled from "styled-components";
import { Box, Text } from "@advisable/donut";
import RecommendationAvatar from "./RecommendationAvatar";
import { Link } from "react-router-dom";

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

export default function ShortlistCard({ shortlist }) {
  const placeholders = Array.apply(null, {
    length: 5 - shortlist.results.nodes.length,
  });

  return (
    <StyledShortlistCard>
      <Box
        as={Link}
        to={`/explore/${shortlist.id}`}
        display={{ _: "block", l: "flex" }}
        justifyContent="space-between"
      >
        <Box maxWidth={{ l: "240px" }} paddingRight={2}>
          <h4 className="text-2xl font-semibold tracking-tight text-blue900 leading-tight">
            {shortlist.name}
          </h4>
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
          {placeholders.map((_, i) => (
            <Box key={i}>
              <RecommendationAvatar size={{ _: "2xs", m: "xs" }} />
            </Box>
          ))}
        </Box>
      </Box>
    </StyledShortlistCard>
  );
}
