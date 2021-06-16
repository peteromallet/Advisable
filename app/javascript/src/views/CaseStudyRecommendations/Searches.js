import React from "react";
import { Box, Text, Container, Badge, Link, Circle } from "@advisable/donut";
import { StyledNewSearchButton, StyledSearchCard } from "./styles";
import { Add } from "@styled-icons/ionicons-outline/Add";
import { useCaseStudySearches } from "./queries";
import { useHistory } from "react-router";

export default function Searches() {
  const history = useHistory();
  const { data, loading } = useCaseStudySearches();

  if (loading) return <>loading...</>;

  const searches = data.caseStudySearches;

  const handleClick = (search) => () => {
    history.push(`/explore/${search.id}`);
  };

  return (
    <Container maxWidth="1100px" py={12}>
      <Box maxWidth="600px" marginBottom={8}>
        <Text fontSize="4xl" fontWeight="600" letterSpacing="-0.04rem" mb={2}>
          Explore
        </Text>
        <Text fontSize="lg" color="neutral800" lineHeight="24px">
          See how other companies have used freelancers in our network to
          accomplish goals similar to yours.
        </Text>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap={2}>
        {searches.map((search) => (
          <StyledSearchCard key={search} onClick={handleClick(search)}>
            <Badge mb={4}>{search.results.nodes.length} new</Badge>
            <Text fontSize="4xl" fontWeight={600} letterSpacing="-0.03rem">
              {search.name}
            </Text>
          </StyledSearchCard>
        ))}
        <Link to="/explore/new">
          <StyledNewSearchButton>
            <Box textAlign="center" mb={8}>
              <Circle bg="rgba(0,0,0, 0.05)" color="white" mb={4}>
                <Add />
              </Circle>
              <Text color="neutral400" fontSize="m">
                Create a new saved search
              </Text>
            </Box>
          </StyledNewSearchButton>
        </Link>
      </Box>
    </Container>
  );
}
