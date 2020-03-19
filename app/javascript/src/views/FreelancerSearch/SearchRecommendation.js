import React from "react";
import { Box, Text, Link, Icon } from "@advisable/donut";
import SearchRecommendationDetails from "./SearchRecommendationDetails";
import ExpandableText from "../../components/ExpandableText";
import FreelancerImageCard from "../../components/FreelancerImageCard";
import Ribbon from "./Ribbon";
import RecommendationBar from "./RecommendationBar";

function SearchRecommendation({ data }) {
  const project = data.search.recommendation;

  return (
    <Box paddingBottom="120px">
      <Link fontSize="l" mb="s" to="/freelancer_search">
        <Icon mr="2px" width={20} height={20} icon="arrow-left" />
        Back
      </Link>
      <Text
        mb="xs"
        fontSize="32px"
        color="blue900"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        We have the perfect freelancer for this!
      </Text>
      <Box maxWidth="800px" mb="xl">
        <Text fontSize="l" lineHeight="l" color="neutral800">
          {project.reviews[0].name} from {project.companyName} recommends{" "}
          {project.specialist.name} for {data.search.industry.name} companies
          {project.goal && <> who want to {project.goal.toLowerCase()}</>}.
        </Text>
      </Box>
      <Box display={{ _: "block", m: "flex" }}>
        <Box width="100%" maxWidth={{ _: "300px", xl: "320px" }} flexShrink={0}>
          <Box mb="l" position="relative">
            <Box position="absolute" right={20} top={-4} zIndex={2}>
              <Ribbon />
            </Box>
            <FreelancerImageCard
              name={project.specialist.name}
              imageURL={project.specialist.avatar}
              location={project.specialist.location}
              rating={project.specialist.ratings.overall}
              reviewsCount={project.specialist.reviewsCount}
            />
          </Box>
          <Text color="neutral900" fontWeight="medium" fontSize="l" mb="xs">
            About
          </Text>
          <ExpandableText
            autoLink
            length={400}
            fontSize="s"
            lineHeight="m"
            color="neutral800"
          >
            {project.specialist.bio}
          </ExpandableText>
        </Box>
        <Box ml="60px">
          <SearchRecommendationDetails data={data} />
        </Box>
      </Box>
      <RecommendationBar data={data} />
    </Box>
  );
}

export default SearchRecommendation;
