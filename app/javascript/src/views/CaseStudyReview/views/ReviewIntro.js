import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Box, Text, Heading, Card, Link } from "@advisable/donut";
import { ExternalLink } from "@styled-icons/heroicons-outline";
import possessive from "src/utilities/possesive";
import AuthenticateWithLinkedin from "../components/AuthenticateWithLinkedin";
import Reviewed from "./Reviewed";

export default function ReviewIntro({ data }) {
  const params = useParams();
  const { id, article_id } = params;
  const { specialist, caseStudy } = data;

  if (data.caseStudy.review) {
    return <Reviewed />;
  }
  if (data.oauthViewer) {
    return <Redirect to={`/review/${id}/case_studies/${article_id}/ratings`} />;
  }

  return (
    <Card padding={["m", "l"]} borderRadius="16px">
      <Heading
        mb={2}
        fontSize={{ _: "24px", m: "30px" }}
        lineHeight={{ _: "28px", m: "32px" }}
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        {specialist.firstName} has requested a review from you on a case study
      </Heading>
      <Text fontSize="16px" lineHeight="24px" color="neutral900" mb={6}>
        Your review will be shown on {possessive(specialist.firstName)} profile
        and will be used to help them find projects on Advisable.
      </Text>
      <Box
        as={Link}
        to={`/freelancers/${specialist.id}/case_studies/${article_id}`}
        target="_blank"
        display="flex"
        border="2px solid"
        borderColor="neutral100"
        borderRadius="12px"
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDirection="row"
        mb={4}
        p={4}
        css={`
          gap: 12px;
        `}
      >
        <Box color="neutral200" height="48px" minWidth="48px">
          <ExternalLink color="neutral200" />
        </Box>
        <Box>
          <Text
            color="neutral500"
            textTransform="uppercase"
            fontSize="2xs"
            fontWeight={450}
          >
            Case Study
          </Text>
          <Text
            fontSize={{ _: "20px", m: "22px" }}
            color="blue900"
            lineHeight="26px"
            fontWeight="medium"
            letterSpacing="-0.01em"
          >
            {caseStudy.title}
          </Text>
        </Box>
      </Box>
      <AuthenticateWithLinkedin data={data} />
    </Card>
  );
}
