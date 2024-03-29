import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Text, Heading, Card } from "@advisable/donut";
import possessive from "src/utilities/possesive";
import AuthenticateWithLinkedin from "src/components/AuthenticateWithLinkedin";
import CaseStudyLink from "../components/CaseStudyLink";
import Reviewed from "./Reviewed";

export default function ReviewIntro({ data }) {
  const params = useParams();
  const { id, article_id } = params;
  const { specialist, caseStudy } = data;

  if (data.caseStudy.review) {
    return <Reviewed />;
  }
  if (data.oauthViewer) {
    return (
      <Navigate
        replace
        to={`/review/${id}/case_studies/${article_id}/ratings`}
      />
    );
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
      <Text fontSize="17px" lineHeight="24px" color="neutral900" mb={6}>
        Your review will be shown on {possessive(specialist.firstName)} public
        profile and will be used to help them find projects on Advisable.
      </Text>
      <CaseStudyLink to={caseStudy.path}>{caseStudy.title}</CaseStudyLink>
      <AuthenticateWithLinkedin data={data} />
    </Card>
  );
}
