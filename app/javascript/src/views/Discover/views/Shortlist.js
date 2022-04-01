import React from "react";
import { Box, Heading, Skeleton } from "@advisable/donut";
import NotFound, { isNotFound } from "src/views/NotFound";
import BackButton from "src/components/BackButton";
import { useShortlist } from "../queries";
import NoMoreResults from "../components/NoMoreResults";
import { useNavigate, useParams } from "react-router";
import RecommendationsSkeleton from "../components/RecommendationsSkeleton";
import Recommendations from "../components/Recommendations";
import AccessDenied, { isNotAuthorized } from "src/views/AccessDenied";

export default function Shortlist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, data, error } = useShortlist();

  if (isNotAuthorized(error)) return <AccessDenied />;
  if (isNotFound(error)) return <NotFound />;
  if (error) return <>Failed to load page. Please try refreshing the page.</>;

  const shortlist = data?.interest;
  const recommendations = shortlist?.results?.nodes || [];

  const handleClick = (recommendation) => {
    navigate(`/explore/${id}/${recommendation.id}`);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <BackButton to="/explore" marginRight={4} />
          {!loading || shortlist?.name ? (
            <Heading
              fontSize={{ _: "28px", m: "36px" }}
              fontWeight={650}
              letterSpacing="-0.06rem"
            >
              {shortlist.name}
            </Heading>
          ) : (
            <Skeleton height="36px" width="220px" />
          )}
        </Box>
      </Box>
      <Box height="1px" bg="neutral100" my={8} />
      {loading ? (
        <RecommendationsSkeleton />
      ) : (
        <Box marginBottom={16}>
          <Recommendations
            shortlist={shortlist}
            recommendations={recommendations}
            onClick={handleClick}
          />
        </Box>
      )}
      <NoMoreResults />
    </>
  );
}
