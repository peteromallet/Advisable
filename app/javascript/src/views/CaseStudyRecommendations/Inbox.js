import React from "react";
import { Box, Text, Skeleton } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";
import { useParams } from "react-router-dom";
import { useCaseStudySearch } from "./queries";
import CardsSkeleton from "./CardsSkeleton";
import inbox from "src/illustrations/inbox.svg";
import postbox from "src/illustrations/postbox.svg";

function SavedSearchEmpty() {
  return (
    <Box paddingY={12} paddingX={4} maxWidth={400} mx="auto" textAlign="center">
      <Box marginBottom={4}>
        <img src={inbox} alt="" />
      </Box>
      <Text fontSize="lg" fontWeight={500} marginBottom={2}>
        No Recommendations
      </Text>
      <Text fontSize="sm" color="neutral700" lineHeight="20px">
        We will keep looking for recommendations for this search and will let
        you know when we have more results.
      </Text>
    </Box>
  );
}

function CompanyRecommendationsEmpty() {
  return (
    <Box paddingY={12} paddingX={4} maxWidth={400} mx="auto" textAlign="center">
      <Box marginBottom={6}>
        <img src={postbox} alt="" />
      </Box>
      <Text fontSize="lg" fontWeight={500} marginBottom={2}>
        No Recommendations
      </Text>
      <Text fontSize="sm" color="neutral700" lineHeight="20px">
        We dont have any company recommendations for you at this time. We will
        keep searching and let you know when we find some.
      </Text>
    </Box>
  );
}

function Loading() {
  return (
    <>
      <Box>
        <Skeleton height="24px" width="30%" />
        <Box marginY={10} height="1px" bg="neutral200" />
        <CardsSkeleton />
      </Box>
    </>
  );
}

export default function ExploreInbox() {
  const { id } = useParams();
  const { data, loading } = useCaseStudySearch({
    variables: { id },
  });

  if (loading) return <Loading />;

  const search = data.caseStudySearch;
  const articles = search.results.nodes;

  return (
    <>
      <Box>
        <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={2}>
          {search.name}
        </Text>
        {search.companyRecomendation && (
          <Text size="lg" color="neutral800">
            See how freelancers in our network have helped similar companies
            achieve their goals.
          </Text>
        )}
        <Box marginY={8} height="1px" bg="neutral200" />
      </Box>
      <CaseStudiesList articles={articles} search={search} />
      {articles.length === 0 &&
        (search.companyRecomendation ? (
          <CompanyRecommendationsEmpty />
        ) : (
          <SavedSearchEmpty />
        ))}
    </>
  );
}
