import React, { useState } from "react";
import { AnimateSharedLayout } from "framer-motion";
import { Box, Heading, Skeleton } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import { useShortlist } from "../queries";
import MoreResults from "../components/MoreResults";
import NoMoreResults from "../components/NoMoreResults";
import { useHistory, useParams } from "react-router";
import RecommendationsSkeleton from "../components/RecommendationsSkeleton";
import Recommendations from "../components/Recommendations";

export default function Shortlist() {
  const { id } = useParams();
  const history = useHistory();
  const [showLoadMore, setShowLoadMore] = useState(true);
  const { loading, data, error } = useShortlist();

  if (error) return <>Failed to load page. Please try refreshing the page.</>;

  const shortlist = data?.caseStudySearch;
  const recommendations = shortlist?.results?.nodes || [];

  const handleClick = (recommendation) => {
    history.push(`/explore/${id}/${recommendation.id}`);
  };

  const handleLoadMore = (data) => {
    const results = data?.refreshCaseStudySearch?.results?.nodes || [];
    if (results >= 5) return;
    setShowLoadMore(false);
  };

  return (
    <AnimateSharedLayout>
      <Box display="flex" alignItems="center">
        <BackButton to="/explore" marginRight={4} />
        {!loading || shortlist?.name ? (
          <Heading fontSize="36px" fontWeight={650} letterSpacing="-0.06rem">
            {shortlist.name}
          </Heading>
        ) : (
          <Skeleton height="36px" width="220px" />
        )}
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
      {!loading && showLoadMore && (
        <MoreResults
          count={recommendations.length}
          onLoadMore={handleLoadMore}
        />
      )}
      {!loading && !showLoadMore && <NoMoreResults />}
    </AnimateSharedLayout>
  );
}
