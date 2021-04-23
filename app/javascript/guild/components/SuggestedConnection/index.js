import React from "react";
import * as Sentry from "@sentry/react";
import { useQuery } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import { SUGGESTED_CONNECTION_QUERY } from "./queries";
import { Text, Card, Avatar, Box, Button } from "@advisable/donut";
import Loading from "@advisable-main/components/Loading";
import RecommendationReason from "./RecommendationReason";

export default function SuggestedConnection() {
  const recommendationsEnabled = useFeatureFlag("guild_recommendations");
  const { data, loading } = useQuery(SUGGESTED_CONNECTION_QUERY, {
    fetchPolicy: "no-cache",
    skip: !recommendationsEnabled,
  });
  const specialistRecommendation = data?.specialistRecommendation;
  const recommendation = specialistRecommendation?.recommendation;

  if (loading) return <Loading />;

  return recommendationsEnabled && recommendation ? (
    <Sentry.ErrorBoundary fallback={null}>
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
        <Card padding="6" borderRadius="12px" background="white" elevation="s">
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
              {recommendation.name}
            </Text>
            <Text
              fontSize="s"
              lineHeight="1.2"
              textAlign="center"
              color="neutral700"
            >
              <RecommendationReason
                specialistRecommendation={specialistRecommendation}
              />
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
    </Sentry.ErrorBoundary>
  ) : null;
}
