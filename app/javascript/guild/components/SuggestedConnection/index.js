import React from "react";
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
import { SUGGESTED_CONNECTION_QUERY } from "./queries";
import { Text, Card, Avatar, Box, Button } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
export default function SuggestedConnection() {
  const { data, loading } = useQuery(SUGGESTED_CONNECTION_QUERY, {
    fetchPolicy: "no-cache",
  });
  const specialistRecommendation = data?.specialistRecommendation;
  const recommendation = specialistRecommendation?.recommendation;

  const skillOrIndustries =
    specialistRecommendation?.__typename === "SkillRecommendation"
      ? specialistRecommendation?.skills
      : specialistRecommendation?.__typename === "SkillRecommendation"
      ? specialistRecommendation?.industries
      : null;
  const skillOrIndustriesNames = skillOrIndustries
    ?.map(({ name }) => name)
    ?.join(", ")
    ?.replace(/, ([^,]*)$/, " and $1");

  if (loading) return <Loading />;

  return recommendation ? (
    <Card
      marginTop="m"
      padding="3"
      marginBottom="4"
      borderRadius="12px"
      background="white"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box marginTop="l" flexShrink="0">
          <Avatar
            as={RouterLink}
            to={`/freelancers/${recommendation.id}/guild`}
            size="l"
            name={recommendation.name}
            url={recommendation.avatar}
          />
        </Box>
        <Text marginY="xs" size="l" color="neutral900" fontWeight="medium">
          {recommendation?.name}
        </Text>
        <Text textAlign="center" size="m" color="neutral600" fontWeight="light">
          {skillOrIndustries
            ? `${recommendation?.firstName} also works in ${skillOrIndustriesNames}`
            : `We think you and ${recommendation?.firstName} could have some related skills or industries`}
        </Text>
        <Button
          as={RouterLink}
          to={`/freelancers/${recommendation.id}/guild`}
          marginTop="m"
          variant="subtle"
        >
          View Profile
        </Button>
      </Box>
    </Card>
  ) : null;
}
