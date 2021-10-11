import React from "react";
import pluralize from "pluralize";
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

function shortlistDescription(shortlist, company) {
  const skill = shortlist.skills?.[0]?.skill?.name?.toLowerCase();
  let output = `Recommendations of ${skill} specialists relevant for`;
  if (company.industry || company.kind) {
    const industry = company.industry?.name?.toLowerCase();
    const companyType = company.kind
      ? pluralize(company.kind?.toLowerCase())
      : "companies";
    if (industry) output += ` ${industry}`;
    if (companyType) output += ` ${companyType}`;
  } else {
    output += " your company.";
  }

  return output;
}

export default function ShortlistCard({ shortlist, company }) {
  const placeholders = [...Array(5 - shortlist.results.nodes.length).keys()];

  return (
    <StyledShortlistCard r1={0.005} r2={0.3}>
      <Box
        as={Link}
        to={`/explore/${shortlist.id}`}
        display={{ _: "block", l: "flex" }}
        justifyContent="space-between"
      >
        <Box maxWidth={{ l: "240px" }} paddingRight={2}>
          <Text
            fontSize="3xl"
            fontWeight={600}
            marginBottom={2}
            color="neutral900"
            letterSpacing="-0.032em"
          >
            {shortlist.name}
          </Text>
          <Text lineHeight="20px" color="neutral700" marginBottom={5}>
            {shortlistDescription(shortlist, company)}
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
