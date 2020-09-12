import React from "react";
import { Box, Text, Tag } from "@advisable/donut";
import Rating from "../../components/Rating";
import renderLinkBreaks from "../../utilities/renderLineBreaks";

function SearchRecommendationDetails({ data }) {
  const project = data.search.recommendation;
  const review = project.reviews[0];

  return (
    <>
      {review && (
        <Box bg="blue100" padding="m" borderRadius="12px" mb="l">
          <Text
            fontSize="l"
            fontStyle="italic"
            lineHeight="l"
            color="blue900"
            mb="m"
          >
            &quot;{review.comment}&quot;
          </Text>
          <Text fontWeight="medium" color="neutral900" mb="xxs">
            {review.name}, {review.role}
          </Text>
          <Text color="neutral600">{project.clientName}</Text>
        </Box>
      )}
      <Text fontSize="l" mb="xs" fontWeight="medium" color="neutral900">
        Project Description
      </Text>
      <Text lineHeight="m" color="neutral800" autoLink>
        {renderLinkBreaks(project.description)}
      </Text>
      {review && (
        <>
          <Box height={1} bg="neutral100" my="l" />
          <Box
            display="grid"
            gridRowGap="10px"
            gridColumnGap="40px"
            gridTemplateColumns={{ _: "1fr", l: "1fr 1fr" }}
          >
            <Rating label="Skills" rating={review.ratings.skills} />
            <Rating
              label="Communication"
              rating={review.ratings.communication}
            />
            <Rating
              label="Quality of Work"
              rating={review.ratings.qualityOfWork}
            />
            <Rating label="Availability" rating={review.ratings.availability} />
            <Rating
              label="Time Management"
              rating={review.ratings.adherenceToSchedule}
            />
          </Box>
        </>
      )}
      <Box height={1} bg="neutral100" my="l" />
      <Box
        display="grid"
        gridColumn={2}
        gridRowGap="20px"
        gridColumnGap="40px"
        gridTemplateColumns={{ _: "1fr", l: "1fr 1fr" }}
      >
        <Box>
          <Text fontSize="m" mb="xs" fontWeight="medium" color="neutral900">
            Skills Used
          </Text>
          {project.skills.map((s) => (
            <Tag key={s.id} mr="xxs" mb="xs">
              {s.name}
            </Tag>
          ))}
        </Box>
        <Box>
          <Text fontSize="m" mb="xs" fontWeight="medium" color="neutral900">
            Industries
          </Text>
          {project.industries.map((i) => (
            <Tag key={i.id} mr="xxs" mb="xs">
              {i.name}
            </Tag>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default SearchRecommendationDetails;
