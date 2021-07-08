import React from "react";
import { Box, Text } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";
import { useParams } from "react-router-dom";
import { useCaseStudySearch } from "./queries";

export default function ExploreInbox() {
  const { id } = useParams();
  const { data, loading } = useCaseStudySearch({
    variables: { id },
  });

  if (loading) return <>loading...</>;

  const search = data.caseStudySearch;

  return (
    <>
      <Box marginBottom={12}>
        <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={2}>
          {search.name}
        </Text>
        {search.companyRecomendation && (
          <Text size="lg" color="neutral800">
            See how freelancers in our network have helped similar companies
            achieve their goals.
          </Text>
        )}
      </Box>
      <CaseStudiesList articles={search.results.nodes} />
    </>
  );
}
