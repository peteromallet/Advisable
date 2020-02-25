import React from "react";
import { Box, Text } from "@advisable/donut";

function Star() {
  return (
    <svg width="19" height="17" fill="none" viewBox="0 0 19 17">
      <path
        fill="currentColor"
        d="M9.49 0l2.503 5.976 6.497.517-4.95 4.211L15.053 17 9.49 13.626 3.928 17l1.512-6.296-4.95-4.21 6.497-.518L9.49 0z"
      ></path>
    </svg>
  );
}

function RatingStar({ filled }) {
  return (
    <Box color={filled ? "neutral.8" : "neutral.4"}>
      <Star />
    </Box>
  );
}

function Rating({ label, rating }) {
  return (
    <Box
      pr="xl"
      mb="xs"
      width="50%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        fontSize="s"
        color="neutral.7"
        fontWeight="medium"
        letterSpacing="-0.01em"
      >
        {label}
      </Box>
      <Box display="flex">
        <RatingStar filled={rating >= 1} />
        <RatingStar filled={rating >= 2} />
        <RatingStar filled={rating >= 3} />
        <RatingStar filled={rating >= 4} />
        <RatingStar filled={rating >= 5} />
      </Box>
    </Box>
  );
}

function Review({ review }) {
  const ratings = review.ratings;

  return (
    <>
      <Box py="xl">
        <Box mb="m" display="flex" alignItems="center">
          <Box
            bg="yellow.4"
            mr="s"
            py="xs"
            px="s"
            color="yellow.8"
            fontSize="xl"
            fontWeight="medium"
            borderRadius="20px"
          >
            <Box mr="xxs" display="inline-block">
              <Star />
            </Box>
            {ratings.overall.toFixed(1)}
          </Box>
          <Box>
            <Text
              fontSize="l"
              fontWeight="medium"
              mb="xxs"
              letterSpacing="-0.01em"
            >
              {review.name}
            </Text>
            <Text color="neutral.8" fontSize="s">
              {review.role} at {review.companyName}
            </Text>
          </Box>
        </Box>
        <Box display="flex" flexWrap="wrap">
          <Rating label="Skills" rating={ratings.skills} />
          <Rating label="Communication" rating={ratings.communication} />
          <Rating label="Quality of Work" rating={ratings.qualityOfWork} />
          <Rating label="Availability" rating={ratings.availability} />
          <Rating
            label="Time Management"
            rating={ratings.adherenceToSchedule}
          />
        </Box>
        <Text mt="s" lineHeight="m" fontStyle="italic">
          "{review.comment}"
        </Text>
      </Box>
      <Box width="100%" height={1} bg="neutral.2" />
    </>
  );
}

export default Review;
