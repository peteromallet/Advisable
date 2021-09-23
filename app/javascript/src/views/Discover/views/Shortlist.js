import React from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Box, Heading, Skeleton } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import { useShortlist } from "../queries";
import Recommendation from "../components/Recommendation";
import MoreResults from "../components/MoreResults";
import NoMoreResults from "../components/NoMoreResults";
import { useHistory, useParams } from "react-router";
import RecommendationsSkeleton from "../components/RecommendationsSkeleton";

export default function Shortlist() {
  const { id } = useParams();
  const history = useHistory();
  const { loading, data, error } = useShortlist();

  if (error) return <>Failed to load page. Please try refreshing the page.</>;

  const shortlist = data?.caseStudySearch;
  const recommendations = shortlist?.results?.nodes || [];

  const handleClick = (recommendation) => {
    history.push(`/explore/${id}/${recommendation.id}`);
  };

  return (
    <AnimateSharedLayout>
      <Box display="flex" alignItems="center">
        <BackButton to="/explore" marginRight={4} />
        {loading ? (
          <Skeleton height="36px" width="220px" />
        ) : (
          <Heading fontSize="36px" fontWeight={650} letterSpacing="-0.06rem">
            {shortlist.name}
          </Heading>
        )}
      </Box>
      <Box height="1px" bg="neutral100" my={8} />
      {loading ? (
        <RecommendationsSkeleton />
      ) : (
        <Box marginBottom={16}>
          {recommendations.map((result, index) => (
            <motion.div layoutId={result.id} key={result.id}>
              <Box marginY={10}>
                <Recommendation
                  number={index + 1}
                  onClick={handleClick}
                  recommendation={result}
                />
              </Box>
              <Box height="1px" bg="neutral100" />
            </motion.div>
          ))}
        </Box>
      )}
      {!loading && recommendations.length >= 5 && <MoreResults />}
      {!loading && recommendations.length < 5 && <NoMoreResults />}
    </AnimateSharedLayout>
  );
}
