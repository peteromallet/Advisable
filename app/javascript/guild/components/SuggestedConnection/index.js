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
    <Box marginBottom={10}>
      <Text
        fontSize="xs"
        marginBottom="3"
        color="neutral600"
        fontWeight="medium"
        textTransform="uppercase"
      >
        Suggested Member
      </Text>
      <Card padding="6" borderRadius="12px" background="white">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Avatar
            size="l"
            as={RouterLink}
            marginBottom={5}
            to={`/freelancers/${recommendation.id}/guild`}
            name={recommendation.name}
            url={recommendation.avatar}
          />
          <Text
            marginBottom={1.5}
            size="l"
            color="neutral900"
            fontWeight="medium"
          >
            {recommendation?.name}
          </Text>
          <Text
            fontSize="s"
            lineHeight="1.2"
            textAlign="center"
            color="neutral700"
          >
            {skillOrIndustries
              ? `${recommendation?.firstName} also works in ${skillOrIndustriesNames}`
              : `We think you and ${recommendation?.firstName} could have some related skills or industries`}
          </Text>
          <Button
            as={RouterLink}
            size="s"
            to={`/freelancers/${recommendation.id}/guild`}
            marginTop="m"
            variant="subtle"
          >
            View Profile
          </Button>
        </Box>
      </Card>
    </Box>
  ) : null;
}
